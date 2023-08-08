const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const faculties = require("../db/faculty.json");
const students = require("../db/student.json");
const labs = require("../db/lab.json");
const fs = require("fs");
const path = require('path');
const uniqueId = require('shortid');
const { JWT_KEY } = require('../keys');
const keys = require('../keys');
var CryptoJS = require("crypto-js");
const mysql = require('mysql');
// import { Link, useNavigate } from "react-router-dom";
const https = require('http');

// const [lablogined,setlab] = useState("");
const db = mysql.createConnection({

    host: "localhost",

    user: "smartuser",

    password: "iiita@123",

    database: "smartlab",

});






db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!a");
});

const allFaculties = async (req, res) => {
    return res.status(200).json({
        faculties: faculties
    })
}

const userRegister = async (req, res) => {
    const { name, phoneNumber, password } = req.body;
    //console.log(name, phoneNumber, password);
    let id = uuidv4();
    if (!name || !phoneNumber || !password) {
        return res.status(422).json({
            error: "Please fill all fields"
        })
    }
    // faculties.forEach(cipher => {
    //     var bytes  = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
    //     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //     // console.log(decryptedData);
    //     if(decryptedData.phoneNumber == phoneNumber){
    //         return res.status(422).json({
    //             error: "phone Number is already taken by someother user :("
    //         })
    //     }
    // })
    let hashedPassword = await bycrpt.hash(password, 10);
    // let newUser = {
    //     id: id,
    //     name: name,
    //     phoneNumber: phoneNumber,
    //     password: hashedPassword,
    //     notification: [],
    //     labId: "",
    //     jwt_token: keys.JWT_KEY
    // }

    var sql = "INSERT INTO faculties (ID,NAME,phone,password,notification,labID,jwt_token) VALUES ?";
    var values = [
        [id, name, phoneNumber, password, "", "", keys.JWT_KEY]
    ]
    db.query(sql, [values], function (errr, result) {
        if (errr) {
            console.log("some error occured");
            console.log(errr);
            // if(errr.code==)
            return res.status(422).json({
                error: "phone Number is already taken by someother user :("
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
    // console.log("after_error");

    // var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(newUser), 'secret key 123').toString();


    // console.log(decryptedData); // [{id: 1}, {id: 2}]
    // faculties.push({ciphertext});
    // fs.writeFile(path.join(__dirname, '../db/faculty.json'), JSON.stringify(faculties), (err) => {
    //     if (err) throw err;
    //     // console.log("New user added");
    // });

}

let loginedlabID = "";
const userLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;
    // console.log("hi");
    // if (!phoneNumber || !password) {
    //     return res.status(422).json({
    //         error: "Incorrect Credentials!"
    //     })
    // }
    let user;
    // faculties.forEach(cipher => {
    //     // Decrypt
    //     var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
    //     var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //     console.log(decryptedData);
    //     if (decryptedData.phoneNumber == phoneNumber) {
    //         user = decryptedData;
    //     }
    // });
    // console.log(user);
    var sql_query = "SELECT * FROM faculties WHERE phone = ? and password = ?";
    // var sql = "INSERT INTO faculties (ID,NAME,phone,password) VALUES ?";
    var values = [phoneNumber, password];
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
                // console.log(result[0]);
                user = result[0];
                // get_req(12321);

                // setlab(user.labID);
                // console.log(lablogined);
                loginedlabID = user.labID;
                console.log(user.loginedlabID);
                const token = jwt.sign({ id: user.ID }, keys.JWT_KEY, { expiresIn: "3600000" });//expires in 1 hour = 3600000 ms
                // console.log(token);
                res.json({
                    success: "Successfully loggedin",
                    token,
                    user: user
                });
            }
            else {
                return res.status(422).json({
                    error: "Incorrect Credentials!"
                })
            }
        }
        // console.log("1 record inserted at : " + result.affectedRows);
    });

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
}






const myLabs = async (req, res) => {
    //req.user.labID
    const result = labs.filter(lab => lab.id == loginedlabID);
    console.log(result[0]);
    return res.json({
        labs: result[0]
    });
}


const createLab = async (req, res) => {
    const { labName } = req.body;
    const newLab = {
        id: uniqueId(),
        name: labName,
        facultyId: req.user.id,
        studentList: []
    }

    // labs.push(newLab);
    console.log(req.user.id);
    // fs.writeFile(path.join(__dirname, '../db/lab.json'), JSON.stringify(labs), (err) => {
    //     if (err) throw err;
    //     console.log("New lab created");
    // });
    // faculties.filter(faculty => {
    //     if(faculty.id == req.user.id){
    //         faculty.labId = newLab.id
    //     }
    // })

    faculties.forEach(cipher => {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (decryptedData.id == req.user.id) {
            decryptedData.labId = newLab.id
            // Encrypt
            cipher.ciphertext = CryptoJS.AES.encrypt(JSON.stringify(decryptedData), 'secret key 123').toString();
        }
    });
    fs.writeFile(path.join(__dirname, '../db/faculty.json'), JSON.stringify(faculties), (err) => {
        if (err) throw err;
        // console.log("New user added");
    });
    return res.status(200).json({
        lab: newLab.id,
        success: "Lab Created successfully :)"
    })
}

const acceptStudentJoinRequest = async (req, res) => {
    const { studentId } = req.body;
    console.log(studentId);
    if (req.user.labId.length == 0) {
        return res.status(200).json({
            success: "You do not have any lab :)"
        })
    }
    else {
        let lab = labs.filter(lab => lab.id == req.user.labId);
        console.log(lab);
        lab[0].studentList.push(studentId);
        fs.writeFile(path.join(__dirname, '../db/lab.json'), JSON.stringify(labs), (err) => {
            if (err) throw err;
            console.log("student added to lab");
        });

        let newNotif = {
            message: "Your request has been accepted",
            Accepted: true
        }

        students.forEach(student => {
            if (student.id == studentId) {
                student.labId = lab[0].id;
                student.notification.push(newNotif);
                student.labJoinStatus = 1;
            }
        })

        fs.writeFile(path.join(__dirname, '../db/student.json'), JSON.stringify(students), (err) => {
            if (err) throw err;
            // console.log("New user added");
        });
        return res.status(200).json({
            success: "student added successfully :)"
        })
    }
}

const rejectStudentJoinRequest = async (req, res) => {

    const { studentId } = req.body;

    let newNotif = {
        message: "Your request has been rejected",
        Accepted: false
    }

    students.forEach(student => {
        if (student.id == studentId) {
            student.notification.push(newNotif);
            student.labJoinStatus = -1;
        }
    })

    fs.writeFile(path.join(__dirname, '../db/student.json'), JSON.stringify(students), (err) => {
        if (err) throw err;
    });

    return res.status(200).json({
        success: "student rejected :("
    })
}

const myNotification = async (req, res) => {
    const faculty = faculties.forEach(cipher => {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(cipher.ciphertext, 'secret key 123');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (decryptedData.id == req.user.id) {
            return decryptedData;
        }
    });
    // const faculty = faculties.forEach(faculty => {
    //     if(faculty.id == req.user.id);
    // });
    return res.status(200).json({
        notification: faculty.notification
    });
}




const studentsInfo = async (req, res) => {
    const { labID } = req.body;
    // console.log(name, phoneNumber, password);
    // let id = uuidv4();
    // if (!labID) {
    //     return res.status(422).json({
    //         error: "no lab is selected!!"
    //     })
    // }
    // console.log(labID);
    console.log("1000");


    var sql_query = "SELECT * FROM studentdetails where labID = ?";
    // var sql = "INSERT INTO faculties (ID,NAME,phone,password) VALUES ?";
    var values = [""];
    db.query(sql_query, values, function (errr, result) {
        if (errr) {
            console.log("some error occured");
            return res.status(422).json({
                error: "Some error occured please contact admin or try again later"
            })
        }
        else {
            if (result.length) {
                // console.log(result[0]);
                user = result;
                // get_req(12321);

                // setlab(user.labID);
                // console.log(lablogined);
                // loginedlabID = user.labID;
                // console.log(user.loginedlabID);
                // const token = jwt.sign({ id: user.ID }, keys.JWT_KEY, { expiresIn: "3600000" });//expires in 1 hour = 3600000 ms
                console.log(user);
                res.json({
                    // success: "Successfully fetched details",
                    // token,
                    users:user,
                });
            }
            else {
                return res.status(422).json({
                    error: "no students in lab!"
                })
            }
        }
    });
}










module.exports = {
            userRegister,
            userLogin,
            allFaculties,
            myLabs,
            createLab,
            acceptStudentJoinRequest,
            rejectStudentJoinRequest,
            myNotification,
            studentsInfo,
        };