import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "../components/Navbar";
import { Button } from "react-bootstrap";

const StudentLab=() => {

	const history = useNavigate();
	const [user,setuser] = useState(	JSON.parse(localStorage.getItem("user")))
	const [list,setlist] = useState([{id:1,name:"hello",state:true}])
    const [state,setstate] = useState();
	const [ct,setct] = useState();
	const [brt,setbrt] = useState();
	const [id,setid] = useState();
	// const [selected,setLights] = useState(	JSON.parse(localStorage.getItem("labs")))
	var selected = JSON.parse(localStorage.getItem("labs"))
	const auth = localStorage.getItem("jwt"); 


	const toggleDevice = async() => {
    
    // let id=sid,state=tate;
    // console.log(id,state);
		if(state) {
		try {
			let res = await fetch("/lightOff", {
						method: "post",
					headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							id
						}),
					})
			let data = await res.json();
			if(data.err) alert(data.err)
			else console.log(data);

		}catch (err) {
		console.log(err);
		}
	}
		else {
		try {
					let res = await fetch("/lightOn", {
						method: "post",
			headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							id
						}),
					})
			let data = await res.json();
			if(data.err) alert(data.err)
			else console.log(data);

		}catch (err) {
		console.log(err);
		}
		}
	}

	const configDevice = async(id) => {
		try{
			let res= await fetch("/lightconfig",{
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						ct,
						bri:brt,
						id
					}),
				})
			let data = await res.json();
			if(data.error) alert(data.error)
			else console.log(data);

		}
		catch (err) {
			console.log(err);
		}
	}
	
  const [hide,sethide] = useState(false);
	const [fhide,setfhide] = useState(false);

    

	return  (
	<div>
      <Navbar></Navbar>
		<div class="devices">
            <div class="card text-bg-light">
                <h3 class="card-header text-bg-light">Details</h3>
                <div class="card-body card-dashboard">
                <h5 class="card-title">Student Roll No : rollno{  user.rollno}</h5>
                </div>
            </div>
            <div class="row row-cols-2 row-cols-md-4 g-4 d1">
                <div >
                    
                    {
                        list  && list.map(item => 
                            <div class="col">
                            <div class="card text-bg-dark">
                                <img src="./Images/bridge.png" class="card-img-top" alt="..." width="190px" height="214px"/>
                                <div class="card-body card-dashboard">
                                <h5 class="card-title">{item.name}</h5>
                                <br />
                                <div class="status">
                                    <label class="switch">
                                        <input type="checkbox" onChange={() => {
                                          setid(item.id)
                                          setstate(item.state)
                                            toggleDevice()
                                        }} />
                                        <span class="slider round"></span>
                                    </label>
                                    
                                </div>
                                </div>
                                <div class="card text-bg-dark">
                                
                                <div className="status">
                                        <label class="" htmlFor="cst">contrast: </label> <br />
                                        <input type="range" name="" id="cst" min="150" max="500" onChange={(e) => {
                                          setct(e.target.value)
                                        }} />
                                        <br />
                                        <label htmlFor="brt">brightness:</label> <br />
                                         <input type="range" name="" id="brt" onChange={(e) => {
                                          setbrt(e.target.value)
                                        }} />
                                      <Button onClick={() => {
                                        configDevice(item.id)
                                      }} >Configure</Button>
                                </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    {/* <button onClick={() => {
                        // sethide(!hide);
                        // setfhide(!fhide)
                        localStorage.setItem("labs",JSON.stringify(selected))
                        history("/lab")
                    }}>Submit</button> */}
                
                </div>

                
                
            </div>
        </div>
    </div>
	)
	
}

export default StudentLab;