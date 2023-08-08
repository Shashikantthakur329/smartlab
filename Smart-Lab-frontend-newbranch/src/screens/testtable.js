import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
// import $ from "jquery";
// import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

import Pagination  from "https://cdn.skypack.dev/rc-pagination@3.1.15";


const Faculty_Dashboard = () => {

    const history = useNavigate()

    const [name, setname] = useState("");
    const auth = localStorage.getItem("jwt");
    let user = JSON.parse(localStorage.getItem("user"))

    // console.log(user);
    React.useEffect(() => {
        fetchDetails()
    }, []);

    const [lab, setlabs] = useState(null)
    const fetchDetails = async () => {
        const response = await axios.get('/facultymylabs', {
            headers: {
                "Authorization": auth,
                // "user":user,
            },
            // "user":"shashikant is the user"
        })
        if (response) {

            setlabs(response.data.labs);
            // setlabs('Zd-0NXapR'); 
            // console.log(lab);
        }
    }


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
    
    const data = [
        {
            "name": "Dael Jankin",
            "position": "Human Resources Manager",
            "gender": "Male",
            "office": "Zhendeqiao",
            "email": "djankin6x@github.io",
            "phone": "843 203 4238",
            "salary": "$34362.23",
            "id": 250,
            "age":20
          },
    ]
    const datatableUsers = [
        {
            "name": "Norris Turri",
            "position": "Executive Secretary",
            "gender": "Male",
            "office": "Zhongxing",
            "email": "nturris@list-manage.com",
            "phone": "524 137 8065",
            "salary": "$29475.42",
            "id": 29
          },
          {
            "name": "Lora Lamb",
            "position": "Software Consultant",
            "gender": "Female",
            "office": "Yuqian",
            "email": "llambt@canalblog.com",
            "phone": "418 783 8567",
            "salary": "$49245.77",
            "id": 30
          },
          {
            "name": "Darrin Petrou",
            "position": "Information Systems Manager",
            "gender": "Female",
            "office": "Santiago de Cuba",
            "email": "dpetrouu@virginia.edu",
            "phone": "968 375 0521",
            "salary": "$46270.94",
            "id": 31
          },
          {
            "name": "Batholomew Batiste",
            "position": "Food Chemist",
            "gender": "Female",
            "office": "Kwaluseni",
            "email": "bbatistev@paypal.com",
            "phone": "764 724 1450",
            "salary": "$37528.46",
            "id": 32
          },
          {
            "name": "Iain Sola",
            "position": "General Manager",
            "gender": "Female",
            "office": "Sulkava",
            "email": "isolaw@livejournal.com",
            "phone": "575 848 3591",
            "salary": "$18307.58",
            "id": 33
          },
          {
            "name": "Olin Ewing",
            "position": "Mechanical Systems Engineer",
            "gender": "Male",
            "office": "Gorki Vtoryye",
            "email": "oewingx@gov.uk",
            "phone": "327 316 3071",
            "salary": "$21823.87",
            "id": 34
          },
          {
            "name": "Barbi Liggens",
            "position": "Assistant Professor",
            "gender": "Female",
            "office": "Ul",
            "email": "bliggensy@paypal.com",
            "phone": "513 894 5534",
            "salary": "$33427.72",
            "id": 35
          },
          {
            "name": "Alisun Trowle",
            "position": "Senior Quality Engineer",
            "gender": "Female",
            "office": "Juanshui",
            "email": "atrowlez@opera.com",
            "phone": "279 204 0884",
            "salary": "$17556.06",
            "id": 36
          },
          {
            "name": "Elvina Hache",
            "position": "Statistician II",
            "gender": "Male",
            "office": "Liulin",
            "email": "ehache10@shinystat.com",
            "phone": "126 110 0147",
            "salary": "$31955.42",
            "id": 37
          },
          {
            "name": "Vaughn McAlinden",
            "position": "Pharmacist",
            "gender": "Male",
            "office": "Lokot’",
            "email": "vmcalinden11@com.com",
            "phone": "764 783 2016",
            "salary": "$43591.44",
            "id": 38
          },
          {
            "name": "Elvina Hache",
            "position": "Statistician II",
            "gender": "Male",
            "office": "Liulin",
            "email": "ehache10@shinystat.com",
            "phone": "126 110 0147",
            "salary": "$31955.42",
            "id": 37
          },
          {
            "name": "Vaughn McAlinden",
            "position": "Pharmacist",
            "gender": "Male",
            "office": "Lokot’",
            "email": "vmcalinden11@com.com",
            "phone": "764 783 2016",
            "salary": "$43591.44",
            "id": 38
          },
          {
            "name": "Elvina Hache",
            "position": "Statistician II",
            "gender": "Male",
            "office": "Liulin",
            "email": "ehache10@shinystat.com",
            "phone": "126 110 0147",
            "salary": "$31955.42",
            "id": 37
          },
          {
            "name": "Vaughn McAlinden",
            "position": "Pharmacist",
            "gender": "Male",
            "office": "Lokot’",
            "email": "vmcalinden11@com.com",
            "phone": "764 783 2016",
            "salary": "$43591.44",
            "id": 38
          },
          {
            "name": "Elvina Hache",
            "position": "Statistician II",
            "gender": "Male",
            "office": "Liulin",
            "email": "ehache10@shinystat.com",
            "phone": "126 110 0147",
            "salary": "$31955.42",
            "id": 37
          },
          {
            "name": "Vaughn McAlinden",
            "position": "Pharmacist",
            "gender": "Male",
            "office": "Lokot’",
            "email": "vmcalinden11@com.com",
            "phone": "764 783 2016",
            "salary": "$43591.44",
            "id": 38
          },
          {
            "name": "Elvina Hache",
            "position": "Statistician II",
            "gender": "Male",
            "office": "Liulin",
            "email": "ehache10@shinystat.com",
            "phone": "126 110 0147",
            "salary": "$31955.42",
            "id": 37
          },
          {
            "name": "Vaughn McAlinden",
            "position": "Pharmacist",
            "gender": "Male",
            "office": "Lokot’",
            "email": "vmcalinden11@com.com",
            "phone": "764 783 2016",
            "salary": "$43591.44",
            "id": 38
          },
          
    ]

    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(datatableUsers.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return datatableUsers.slice((current - 1) * pageSize, current * pageSize);
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>;
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>;
        }
        return originalElement;
    }



    return (
        <>
            <div className="container-fluid mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                        <div className="card-body p-0">
                            
                            <div className="table-filter-info">
                                
                                <Pagination
                                    className="pagination-data"
                                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={datatableUsers.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />
                            </div>
                            <div className="table-responsive">
                                <table className="table table-text-small mb-0">
                                    <thead className="thead-primary table-sorting">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Position</th>
                                            <th>Gender</th>
                                            <th>Email</th>
                                            <th>Salary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData(current, size).map((data, index) => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        <td>{data.name}</td>
                                                        <td>{data.position}</td>
                                                        <td>{data.gender}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.salary}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                          <div className="table-filter-info">
                                
                                <Pagination
                                    className="pagination-data"
                                    showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                    onChange={PaginationChange}
                                    total={datatableUsers.length}
                                    current={current}
                                    pageSize={size}
                                    showSizeChanger={false}
                                    itemRender={PrevNextArrow}
                                    onShowSizeChange={PerPageChange}
                                />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );

    // return (
    //     <div>
    //         <Navbar></Navbar>
    //         {/* style={ {display:"flex", flexDirection: "column"}} */}
    //         <div >
    //             {user.labID == "" ?
    //                 <div className="card" style={{ textAlignment: "left" }} id="fac">
    //                     <h3>Create Lab</h3>
    //                     <p className="card-text">
    //                         <input
    //                             type="text"
    //                             placeholder="Lab Name"
    //                             value={name}
    //                             onChange={(e) => setname(e.target.value)}
    //                         />

    //                     </p>
    //                     <button className="btn btn-primary" onClick={() => AddLab()}>
    //                         Add
    //                     </button>

    //                 </div>
    //                 :
    //                 <div className="card" id="std">
    //                     <section>
    //                         <h3 class="testing">Testing</h3>
    //                         {/* <p>You can easily make changes in <span class="code">:root</span> <span class="code-css">CSS</span></p> */}
    //                     </section>

    //                     <div className="stable">
    //                         <table>
    //                             <caption>
    //                                 Top 3 osu! ranked players (25th April 2023)
    //                             </caption>

    //                             <tr>
    //                                 <th>Name</th>
    //                                 <th>Age</th>
    //                                 <th>Gender</th>
    //                             </tr>
    //                             {data.map((val, key) => {
    //                                 return (
    //                                     <tr key={key}>
    //                                         <td>{val.name}</td>
    //                                         <td>{val.age}</td>
    //                                         <td>{val.gender}</td>
    //                                     </tr>
    //                                 )
    //                             })}
    //                         </table>
    //                     </div>

    //                 </div>
    //             }
    //         </div>
    //     </div>
    // )
}
export default Faculty_Dashboard;