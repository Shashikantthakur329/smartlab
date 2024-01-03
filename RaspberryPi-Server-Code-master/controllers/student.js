const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
var smtpjs = require('../smtp.js');
const students = require("../db/student.json");
const faculties = require("../db/faculty.json");
const labs = require("../db/lab.json");
const nodeMailer = require("../nodemailer.js");
const fs = require("fs");
const path = require('path');
const uniqueId = require('shortid');
var CryptoJS = require("crypto-js");
const { JWT_KEY } = require('../keys');
const keys = require('../keys');
const mysql = require('mysql');
const https = require('http');


//mysql connection
const db = mysql.createConnection({

    host: "localhost",

    user: "",

    password: "",

    database: "smartlab",

});
db.connect(function (err) {
    if (err) throw err;
});


// get_request for mac_address
let user_mac = '';
function get_req(reqqq) {
    let data1 = 'asd';
    url = "http://127.0.0.1:5001/query-example?roll_no=" + reqqq.toString();
    https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            //console.log(JSON.parse(data).explanation);
            console.log("mac addr: " + data)
            user_mac = data;
            data1 = data;
            // console.log("data "+data);
            // console.log("user_mac " + user_mac);
            // return data;
        });
        return data;
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    return data1;
}




const userRegister = async (req, res) => {
    const { rollNumber, password } = req.body;
    console.log(rollNumber, password);
    let id = uuidv4();
    if (!rollNumber || !password) {
        return res.status(422).json({
            error: "Please fill all fields"
        })
    }

    // students.forEach(cipher => {
    //     var bytes  = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
    //     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //     // console.log(decryptedData);
    //     if(decryptedData.rollNumber == rollNumber){
    //         return res.status(422).json({
    //             error: "roll Number is already taken by someother user :("
    //         })
    //     }
    // })


    let hashedPassword = await bycrpt.hash(password, 10);
    // let newUser = {
    //     id: id,
    //     rollNumber: rollNumber,
    //     password: hashedPassword,
    //     notification: [],
    //     labId: "",
    //     labJoinStatus: -1,
    //     jwt_token: keys.JWT_KEY
    // }    
    var sql_query = "SELECT * FROM students WHERE rollNumber = ?";
    var values = [rollNumber];
    db.query(sql_query, values, function (errr, result) {
        if (errr) {
            console.log("some error occured");
            // console.log(errr);
            // if(errr.code==)
            return res.status(422).json({
                error: "Some error occured please contact admin or try again later"
            })
        }
        else {
            if (result.length) {
                return res.status(422).json({
                    error: "roll number already registered"
                })
                return;
            }
            else {
                var sql = "INSERT INTO students (ID,rollNumber,password,notification,labID,labJoinStatus,jwt_token) VALUES ?";
                var values = [
                    [id, rollNumber, password, "", "", -1, keys.JWT_KEY]
                ]
                db.query(sql, [values], function (errr, result) {
                    if (errr) {
                        console.log("some error occured");
                        console.log(errr);
                        // if(errr.code==)
                        return res.status(422).json({
                            error: "roll number is already taken by someother user!!"
                        })
                    }
                    else {
                        console.log("New user added");
                        return res.status(200).json({
                            success: "registered successfully!!"
                        })
                    }
                    // console.log("1 record inserted at : " + result.affectedRows);
                });
            }
        }
    });


    // Encrypt
    // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(newUser), 'secret key 123').toString();
    // students.push({ciphertext});

    // fs.writeFile(path.join(__dirname, '../db/student.json'), JSON.stringify(students), (err) => {
    //     if (err) throw err;
    //     // console.log("New user added");
    // });
    // return res.status(200).json({
    //     success: "Registered successfully :)"
    // })
}


const userLogin = async (req, res) => {
    const { rollNumber, password, os, browser, mobile, devicetypeDetails } = req.body;
    if (!rollNumber || !password) {
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }
    let user;
    // students.forEach(cipher => {
    //     // Decrypt
    //     var bytes  = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
    //     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //     // console.log(decryptedData);
    //     if(decryptedData.rollNumber == rollNumber){
    //         user = decryptedData;
    //     }
    // });
    // const user = students.filter(user => user.rollNumber == rollNumber);
    // if (!user) {
    //     return res.status(422).json({
    //         error: "Incorrect Credentials :("
    //     })
    // }
    // let passCheck = await bycrpt.compare(password, user.password);
    // if (passCheck) {
    //     const token = jwt.sign({ id: user.id }, keys.JWT_KEY, { expiresIn: "3600000" });//expires in 1 hour = 3600000 ms
    //     res.json({
    //         success: "Successfully LoggedIn",
    //         token,
    //         user: user
    //     });
    // } else {
    //     return res.status(422).json({
    //         error: "Incorrect Credentials!"
    //     })
    // }
    var sql_query = "SELECT * FROM students WHERE rollNumber = ?";
    var values = [rollNumber];
    db.query(sql_query, values, function (errr, result) {
        if (errr) {
            console.log("some error occured");
            // console.log(errr);
            // if(errr.code==)
            return res.status(422).json({

                error: "Some error occured please contact admin or try again later"
            })
        }
        else {
            if (!result.length) {
                return res.status(422).json({
                    error: "user not registered"
                })
            }
            else {
                var sql_query = "SELECT * FROM students WHERE rollNumber = ? and password = ?";
                var values = [rollNumber, password];
                db.query(sql_query, values, function (errr, result) {
                    if (errr) {
                        console.log("some error occured");
                        return res.status(422).json({
                            error: "Some error occured please contact admin or try again later"
                        })
                    }
                    else {
                        if (result.length) {
                            user = result[0];
                            id = user['ID'];
                            url = "http://127.0.0.1:5001/query-example?roll_no=" + rollNumber.toString();

                            https.get(url, (resp) => {
                                let data = '';

                                // A chunk of data has been received.
                                resp.on('data', (chunk) => {
                                    data += chunk;
                                });

                                // The whole response has been received. Print out the result.
                                resp.on('end', () => {
                                    //console.log(JSON.parse(data).explanation);
                                    console.log("mac addr: " + data)
                                    user_mac = data;
                                    // user_mac = "11:11:11:11:11:11";
                                    var sql_get_details = "select * from studentdetails where rollNumber = ?";
                                    var detail_values = [rollNumber];
                                    db.query(sql_get_details, detail_values, function (errr, result) {
                                        if (errr) {
                                            console.log("some error occured");
                                            return res.status(422).json({
                                                error: "Some error occured please contact admin or try again later"
                                            })
                                        }
                                        else {
                                            if (result.length) {
                                                userdetails = result[0];
                                                console.log('\n');
                                                console.log('\n');
                                                console.log(userdetails);
                                                res_mac_addr = userdetails['mac_addr'];
                                                res_os = userdetails['operating_system'];
                                                res_browser = userdetails['browser'];
                                                res_mobile = userdetails['mobile'];

                                                if(res_mac_addr != user_mac)
                                                {

                                                    //condition needs to be changed!!!
                                                    if(os == res_os)
                                                    {
                                                        var email__ = rollNumber + "@iiita.ac.in";
                                                        var subject__ = "SMARTLAB_IIITA : Possibility of MITM detected";
                                                        var message__ = "Dear user, Our system has detected your mac address as <b>" + user_mac + "</b> which differs from you previous mac address : <b>"+ res_mac_addr 
                                                        + "</b>.<br> If your current device mac_address is not <b>" + user_mac + "</b>, then there might be possibility of Man in the Middle Attack, kindly revert back to this mail.";  

                                                        nodeMailer.sendEmail(email__, subject__, message__);
                                                        console.log("mitm possibility detected!!");

                                                        const token = jwt.sign({ id: user.ID }, keys.JWT_KEY, { expiresIn: "3600000" });//expires in 1 hour = 3600000 ms
                                                        res.json({
                                                            success: "Successfully loggedin",
                                                            token,
                                                            user: user
                                                        });

                                                    }
                                                }
                                            }
                                            else {
                                                var sql = "INSERT INTO studentdetails (ID,rollNumber,mac_addr,operating_system,browser,mobile,labID,device_type) VALUES ?";
                                                var values = [
                                                    [id, rollNumber, user_mac, os, browser, mobile, "", devicetypeDetails]
                                                ]
                                                db.query(sql, [values], function (errr, result) {
                                                    if (errr) {
                                                        console.log("some error occured");
                                                        console.log(errr);
                                                        return res.status(422).json({
                                                            error: "some error occured in "
                                                        })
                                                    }
                                                    else {
                                                        const token = jwt.sign({ id: user.ID }, keys.JWT_KEY, { expiresIn: "3600000" });//expires in 1 hour = 3600000 ms
                                                        res.json({
                                                            success: "Successfully loggedin",
                                                            token,
                                                            user: user
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    });
                                });
                                return data;
                            }).on("error", (err) => {
                                console.log("Error while requesting python server " + err.message);
                            });
                            // var smac_addr = get_req(rollNumber);
                            // console.log("hello mac user "+smac_addr);
                            // // console.log("hello user!")
                            // console.log("inside func "+user_mac);
                            // var sql = "INSERT INTO studentdetails (ID,rollNumber,mac_addr,operating_system,browser,mobile,labID) VALUES ?";
                            // var values = [
                            //     [id, rollNumber, "00:00:00:00:00", os, browser, mobile, ""]
                            // ]
                            // db.query(sql, [values], function (errr, result) {
                            //     if (errr) {
                            //         console.log("some error occured");
                            //         console.log(errr);
                            //         return res.status(422).json({
                            //             error: "some error occured in "
                            //         })
                            //     }
                            //     else {
                            //         const token = jwt.sign({ id: user.ID }, keys.JWT_KEY, { expiresIn: "3600000" });//expires in 1 hour = 3600000 ms
                            //         res.json({
                            //             success: "Successfully loggedin",
                            //             token,
                            //             user: user
                            //         });
                            //     }
                            // });
                            // setlab(user.labID);
                            // console.log(lablogined);

                            //     const token = jwt.sign({ id: user.id }, keys.JWT_KEY, { expiresIn: "3600000" });//expires in 1 hour = 3600000 ms
                            //     res.json({
                            //         success: "Successfully LoggedIn",
                            //         token,
                            //         user: user
                            //     });
                            // } else {
                            //     return res.status(422).json({
                            //         error: "Incorrect Credentials!"
                            //     })
                            // loginedlabID = user.labID;
                            // console.log(user.loginedlabID);
                        }
                        else {
                            return res.status(422).json({
                                error: "Incorrect Credentials!"
                            })
                        }
                    }
                    // console.log("1 record inserted at : " + result.affectedRows);
                });
            }
        }
    });

}

const studentDetail = async (req, res) => {
    const { studentId } = req.body;
    // const student = students.filter(student => student.id == studentId);

    let student;
    students.forEach(cipher => {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedData);
        if (decryptedData.id == studentId) {
            student = decryptedData;
        }
    });
    return res.status(200).json({
        studentDetails: student
    });
}

const myLabs = async (req, res) => {
    let labDetail;
    await labs.forEach(lab => {
        if (lab.id == req.user.labId) {
            labDetail = lab
        }
    });
    // console.log(labDetail);

    let facultyName;
    faculties.forEach(cipher => {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedData);
        if (decryptedData.id == labDetail.facultyId) {
            facultyName = decryptedData.name;
        }
    });
    return res.json({
        lab: labDetail,
        faculty: facultyName
    });
}

const joinFaculty = async (req, res) => {
    const { facultyId } = req.body;

    faculties.forEach(cipher => {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedData);
        if (decryptedData.id == facultyId) {
            decryptedData.notification.push({ studentId: req.user.id });
            cipher.ciphertext = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), 'secret key 123').toString();
        }
    });
    fs.writeFile(path.join(__dirname, '../db/faculty.json'), JSON.stringify(faculties), (err) => {
        if (err) throw err;
        // console.log("New user added");
    });
    let student;

    students.forEach(cipher => {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedData);
        if (decryptedData.id == req.user.id) {
            decryptedData.labJoinStatus = 0;
            student = decryptedData;
            cipher.ciphertext = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), 'secret key 123').toString();
        }
    });
    fs.writeFile(path.join(__dirname, '../db/student.json'), JSON.stringify(students), (err) => {
        if (err) throw err;
        // console.log("New user added");
    });

    return res.status(200).json({
        success: "Request sent successfully :)",
        user: student
    });
}

const myNotification = async (req, res) => {

    let student;
    students.forEach(cipher => {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedData);
        if (decryptedData.id == req.user.id) {
            student = decryptedData;
        }
    });
    return res.status(200).json({
        notification: student.notification
    });
}

module.exports = {
    userRegister,
    userLogin,
    studentDetail,
    myLabs,
    joinFaculty,
    myNotification
};
