import socket
import struct
import textwrap
import threading
import re

#declaring mutex lock
LOCK=threading.Lock()

#dummy variable
dd=1

#declaring data structures
_data={}
_data_temp={}


# import main Flask class and request object
from flask import Flask, request

#Flask app
host_name = "127.0.0.1"
port = 5001
app = Flask(__name__)

@app.route('/query-example')
def query_example():
    roll_no_req=""
    LOCK.acquire()
    try:
        global _data
        roll_no_req = request.args['roll_no']
        if (roll_no_req,'mac') in _data:
            res = str(_data[(roll_no_req,'mac')])
        else:
            res="00:00:00:00:00:00"
        print(res)
    finally:
        LOCK.release()
    return res



# packet capturing
def paccap():
    global _data
    print("capturing packet")
    conn = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))

    while True:
        raw_data,addr=conn.recvfrom(65536)
        dest_addr, src_addr, eth_proto, ip_data = ethernet_frame(raw_data)

        #updating main data structure whenever lock is unlocked.
        if LOCK.locked():
            continue;
        else:
            for key in _data_temp:
                with LOCK:
                    _data[key]=_data_temp[key]
                    del _data_temp[key]
        
        if eth_proto == 8:
            (version, header_length,ttl,proto,src,target,data_ipv4) = ipv4_packet(ip_data)
            if proto==6:
                 (src_port,dest_port,sequence,acknowledgement,flag_urg,flag_ack,flag_psh,flag_rst,flag_syn,flag_fin,tcp_data)=tcp_segment(data_ipv4)
                 if b'login_attempt' in tcp_data:
                     login_pos = tcp_data.find(b'rollNumber')
                     roll_pos = login_pos+13
                     roll_no=""
                     while tcp_data[roll_pos]!=34:
                         roll_no=roll_no+chr(tcp_data[roll_pos])
                         roll_pos+=1
                     
                     if src != '127.0.0.1':
                     
                         if LOCK.locked():
                             _data_temp[(roll_no,'mac')]=src_addr
                             _data_temp[(roll_no,'ip')]=src
                         else:
                             LOCK.acquire()
                             #global _data
                             _data[(roll_no,'mac')]=src_addr
                             _data[(roll_no,'ip')]=src
                             LOCK.release()
                             #print("login detected: roll no: {}; mac_addr: {}".format(roll_no,_data[(roll_no,'mac')]))

                     #print("user with roll no. {} tried to login with ip {} and mac_address {}".format(roll_no,src,src_addr))
                     #print(TAB_3 + 'DATA: ',end="")
                     #print(TAB_3 + str(tcp_data))
                 #print(format_multi_line(data_ipv4))

#        print(raw_data)



def ethernet_frame(data):
    dest_mac,src_mac,proto=struct.unpack("! 6s 6s H",data[:14])
    return get_mac_addr(dest_mac),get_mac_addr(src_mac),socket.htons(proto), data[14:]


def get_mac_addr(bytes_addr):
    bytes_str=map('{:02x}'.format,bytes_addr)
    return ':'.join(bytes_str).upper()


#decoding ipv4_packet
def ipv4_packet(data):
    version_header_length=data[0]
    version=version_header_length >> 4
    header_length = (version_header_length & 15) * 4
    ttl, proto, src, target = struct.unpack("! 8x B B 2x 4s 4s", data[:20])
    return version, header_length, ttl, proto, ipv4(src), ipv4(target), data[header_length:]


#formatting ipv4
def ipv4(addr):
    return '.'.join(map(str,addr))

#unpack icmp_segment
def icmp_segment(data):
    icmp_type, code, checksum = struct.unpack('! B B H', data[:4])
    return icmp_type,code,checksum,data[4:]

#unpack tcp_segment
def tcp_segment(data):
    (src_port,dest_port,sequence,acknowledgement,offset_reserved_flags)=struct.unpack('! H H L L H',data[:14])
    offset = (offset_reserved_flags >> 12) * 4
    flag_urg = (offset_reserved_flags & 32) >> 5
    flag_ack = (offset_reserved_flags & 16) >> 5
    flag_psh = (offset_reserved_flags & 8) >> 5
    flag_rst = (offset_reserved_flags & 4) >> 5
    flag_syn = (offset_reserved_flags & 2) >> 5
    flag_fin = (offset_reserved_flags & 1) >> 5

    return src_port, dest_port, sequence, acknowledgement, flag_urg, flag_ack, flag_psh, flag_rst, flag_syn, flag_fin, data[offset:]


def udp_segment(data):
    src_port, dest_port, size=struct.unpack('! H H 2x H', data[:8])
    return src_port, dest_port, size, data[8:]


#'''
#def format_multi_line(prefix,string,size=80):
#    size-=len(prefix)
#    if isinstance(string, bytes):
#        string = ''.join(r'\x{:02x}',format(byte) for byte in string)
#        if size % 2:
#            size -= 1
#
#        return '\n'.join([prefix + line for line in textwrap.wrap(string, size)])


if __name__ == '__main__':
    t2=threading.Thread(target=paccap)
    t2.start()
    t1=threading.Thread(target=app.run(port=port,use_reloader=False, debug=True))
    t1.start()

