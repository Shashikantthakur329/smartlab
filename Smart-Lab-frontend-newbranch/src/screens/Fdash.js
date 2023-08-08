import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const Faculty_Dashboard=() => {

	const history = useNavigate()

	const [name,setname] = useState("");
	const auth = localStorage.getItem("jwt"); 
	let user = JSON.parse(localStorage.getItem("user"))
	
	// console.log(user);
	React.useEffect(() => {
		fetchDetails()
	}, []);
	
	const [lab,setlabs] = useState(null)
	const fetchDetails = async() => {
		const response = await axios.get('/facultymylabs', {
			headers: {
				"Authorization": auth,
				// "user":user,
			},
			// "user":"shashikant is the user"
		})
		if(response){
			
			setlabs(response.data.labs);
			// setlabs('Zd-0NXapR'); 
			// console.log(lab);
		}
	}


	const AddLab = async() => {
		try { 
			let res = await fetch("/createLab", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"authorization": auth,
				},
				body: JSON.stringify({
					labName:name
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
		catch(err) {
			console.log(err);
		}
	}


	return (
		<div>
			<Navbar></Navbar>
			{/* style={ {display:"flex", flexDirection: "column"}} */}
			<div >
					{ user.labID == "" ? 
								<div className="card" style={{textAlignment:"left"}} id="fac">
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
								<div className= "card" id="std">
									<h3>Lab ID: {user.labId}</h3>
									
									<Link to="/slab"> Activate lab</Link>
									
								</div>
							}			
			</div>
			</div>
		)
}
export default Faculty_Dashboard;