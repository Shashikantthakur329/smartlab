import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
// import $ from "jquery";
// import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

// import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";


const Faculty_Dashboard = () => {

    const history = useNavigate()

    const [name, setname] = useState("");
    const auth = localStorage.getItem("jwt");
    let user = JSON.parse(localStorage.getItem("user"))

    // console.log(user);
    // React.useEffect(() => {
    //     fetchDetails()
    // }, []);

    const [lab, setlabs] = useState(null)
    // const fetchDetails = async () => {
    //     const response = await axios.get('/facultymylabs', {
    //         headers: {
    //             "Authorization": auth,
    //             // "user":user,
    //         },
    //         // "user":"shashikant is the user"
    //     })
    //     if (response) {

    //         setlabs(response.data.labs);
    //         // setlabs('Zd-0NXapR'); 
    //         // console.log(lab);
    //     }
    // }


    const AddLab = async () => {
        try {
            let res = await fetch("/createLab", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": auth,
                },
                body: JSON.stringify({
                    labName: name
                }),
            })
            let data = await res.json();
            if (data.error) {
                alert(data.error);
            } else {
                setname("");
                history("/Fdash")
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const [sdata, setData] = useState([
        {
            ID: '123',
            rollNumber: '123',
            mac_addr: '123',
            operating_system: '123',
            browser: '123',
            mobile: '0',
            labID: '',
            join_time: "123"
        }
    ]);
    const [users, setUsers] = useState([])
    let data1 = [];



    const getstudentdetails = async () => {
        try {
            var lab = "123";
            // console.log("sasdasd");
            let res = await fetch("/getstudentsinlab", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lab,
                }),
            })
            // console.log("sasdasd123");

            let data = await res.json();
            // console.log(data['users']);
            // console.log();
            if (data.error) {
                // console.log("errorrrrrrrrr!!!!!");
                alert(data.error);
            } else {
                // let updatedValue = {"item1":"juice"};
                data1 = data.users;
                let tempdata = data.users;
                // console.log(tempdata);

                // console.log(sdata)
                // console.log("asd"+sdata);
                // data=data.users;
                // console.log((Object.keys(data)));
                // console.log((Object.keys(data.users)));
                let tdata = [];
                tdata = data.users;
                // console.log(tdata);
                // setData({...sdata, tdata});
                // console.log(sdata);
                setUsers(data.users);
                // console.log(users);
                // console.log(typeof(data.users));
                // console.log(data.users);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getstudentdetails()
    }, []);
    // getstudentdetails();
    // const studentsdata = () => {
    //     alert("hurray");
    // }
    // studentsdata();

    // const data = [
    //     {
    //         "name": "Daels Jankin",
    //         "gender": "Male",
    //         "id": 250,
    //         "age":20
    //       },
    // ]
    // const datatableUsers = [
    //     {
    //         "name": "Norris Turri",
    //         "position": "Executive Secretary",
    //         "gender": "Male",
    //         "office": "Zhongxing",
    //         "email": "nturris@list-manage.com",
    //         "phone": "524 137 8065",
    //         "salary": "$29475.42",
    //         "id": 29
    //       },
    // ]

    // const [perPage, setPerPage] = useState(10);
    // const [size, setSize] = useState(perPage);
    // const [current, setCurrent] = useState(1);

    // const PerPageChange = (value) => {
    //     setSize(value);
    //     const newPerPage = Math.ceil(datatableUsers.length / value);
    //     if (current > newPerPage) {
    //         setCurrent(newPerPage);
    //     }
    // }

    // const getData = (current, pageSize) => {
    //     // Normally you should get the data from the server
    //     return datatableUsers.slice((current - 1) * pageSize, current * pageSize);
    // };

    // const PaginationChange = (page, pageSize) => {
    //     setCurrent(page);
    //     setSize(pageSize)
    // }

    // const PrevNextArrow = (current, type, originalElement) => {
    //     if (type === 'prev') {
    //         return <button><i className="fa fa-angle-double-left"></i></button>;
    //     }
    //     if (type === 'next') {
    //         return <button><i className="fa fa-angle-double-right"></i></button>;
    //     }
    //     return originalElement;
    // }


    // return (
    //     <>
    //         <div className="container-fluid mt-5 mb-5">
    //             <div className="row justify-content-center">
    //                 <div className="col-md-10">
    //                     <div className="card">
    //                     <div className="card-body p-0">

    //                         <div className="table-filter-info">

    //                             <Pagination
    //                                 className="pagination-data"
    //                                 showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
    //                                 onChange={PaginationChange}
    //                                 total={datatableUsers.length}
    //                                 current={current}
    //                                 pageSize={size}
    //                                 showSizeChanger={false}
    //                                 itemRender={PrevNextArrow}
    //                                 onShowSizeChange={PerPageChange}
    //                             />
    //                         </div>
    //                         <div className="table-responsive">
    //                             <table className="table table-text-small mb-0">
    //                                 <thead className="thead-primary table-sorting">
    //                                     <tr>
    //                                         <th>#</th>
    //                                         <th>Name</th>
    //                                         <th>Position</th>
    //                                         <th>Gender</th>
    //                                         <th>Email</th>
    //                                         <th>Salary</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     {
    //                                         getData(current, size).map((data, index) => {
    //                                             return (
    //                                                 <tr key={data.id}>
    //                                                     <td>{data.id}</td>
    //                                                     <td>{data.name}</td>
    //                                                     <td>{data.position}</td>
    //                                                     <td>{data.gender}</td>
    //                                                     <td>{data.email}</td>
    //                                                     <td>{data.salary}</td>
    //                                                 </tr>
    //                                             )
    //                                         })
    //                                     }
    //                                 </tbody>
    //                             </table>
    //                         </div>
    //                       <div className="table-filter-info">

    //                             <Pagination
    //                                 className="pagination-data"
    //                                 showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
    //                                 onChange={PaginationChange}
    //                                 total={datatableUsers.length}
    //                                 current={current}
    //                                 pageSize={size}
    //                                 showSizeChanger={false}
    //                                 itemRender={PrevNextArrow}
    //                                 onShowSizeChange={PerPageChange}
    //                             />
    //                         </div>
    //                     </div>
    //                 </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // );

    return (
        <div>
            <Navbar></Navbar>
            {/* style={ {display:"flex", flexDirection: "column"}} */}
            <div >
                {user.labID == "" ?
                    <div className="card" style={{ textAlignment: "left" }} id="fac">
                        <h3>Create Lab</h3>
                        <p className="card-text">
                            <input
                                type="text"
                                placeholder="Lab Name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />

                        </p>
                        <button className="btn btn-primary" onClick={() => AddLab()}>
                            Add
                        </button>

                    </div>
                    :
                    <div className="card" id="std">
                        <caption>
                            Students currently in lab
                        </caption>
                        <div className="stable">
                            <table>


                                <tr>
                                    <th>Roll No.</th>
                                    <th>Mac Address</th>

                                    <th>Operating system</th>
                                    <th>Browser</th>
                                    <th>Mobile</th>
                                    <th>Device Type</th>


                                </tr>
                                {/* {sdata} */}
                                {users.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.rollNumber}</td>
                                            <td>{val.mac_addr}</td>
                                            <td>{val.operating_system}</td>
                                            <td>{val.browser}</td>
                                            <td>{val.mobile}</td>
                                            <td>{val.device_type}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>

                    </div>
                }
            </div>
        </div>
    );

    // const [data, setData] = useState([]);

    // const fetchData = () => {
    //   fetch(`https://dummyjson.com/products`)
    //     .then((response) => response.json())
    //     .then((actualData) => {
    //       console.log(actualData);
    //       setData(actualData.products);
    //       console.log(data);
    //     })
    //     .catch((err) => {
    //       console.log(err.message);
    //     });
    // };

    // React.useEffect(() => {
    //   fetchData();
    // }, []);

    // return (
    //   <div className="App">
    //     <tbody>
    //       <tr>
    //         <th>Name</th>
    //         <th>Brand</th>
    //         <th>Image</th>
    //         <th>Price</th>
    //         <th>Rating</th>
    //       </tr>
    //       {data.map((item, index) => (
    //         <tr key={index}>
    //           <td>{item.title}</td>
    //           <td>{item.brand}</td>
    //           <td>
    //             <img src={item.thumbnail} alt="" height={100} />
    //           </td>
    //           <td>{item.price}</td>
    //           <td>{item.rating}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </div>
    // );


}
export default Faculty_Dashboard;