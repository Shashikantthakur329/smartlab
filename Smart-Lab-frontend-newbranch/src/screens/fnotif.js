import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toast,Modal,Button } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const Faculty_Notification=() => {

	const history = useNavigate()
	  
	  const user = JSON.parse(localStorage.getItem("user"))
	  const jwt = localStorage.getItem("jwt")
	  const [Notifications , setNotifications] = React.useState(user.notification)
	  const reqA = async(id) => {
		console.log(id);
		try{
			let res= await fetch("/acceptstudentrequest", {
				method: "post",
				headers:{
					"Content-Type": "application/json",
					"authorization": jwt,
				},
				body: JSON.stringify({
					studentId: id,
				}),
			})
			if(res) {
				console.log(res);
			}
		}
		catch (err) {
			alert(err);
		}
	  }

	  const reqR = async(id) => {
		try{
			let res= await fetch("/rejectstudentrequest", {
				method: "post",
				headers:{
					"Content-Type": "application/json",
					"authorization" : jwt
				},
				body: JSON.stringify({
					studentId: id,
				}),
			})
			if(res) {
				console.log(res);
			}
		}
		catch (err) {
			alert(err);
		}
	  }
		
		
		return (
			<div>
				<Navbar></Navbar>
			<div class="notifications">
			<div class="card noti-card text-bg-light noti-card1">
				<h5>Notifications</h5>
			</div>
			{Notifications.map((Notification) =>  
	
			  <div>
			  <div class="card noti-card ">
			  <h5 class="card-header text-bg-dark">{Notification.labId}</h5>
			  <div class="card-body">
				<h5 class="card-title">Lab Join Request Pending</h5>
				<div class="card-dashboard">
				  <p class="card-text">{Notification.studentId}</p>
				
				<div>
				<Button onClick={
					() => {
						reqA(Notification.studentId)
					}
				}>Accept</Button>
				<Button onClick={
					() => {
						reqR(Notification.studentId)
					}
				}>Reject</Button>
				</div>
		
				</div>
			  </div>
			  </div>
	
			  </div>
			)}
		   
			  {/* <div class="card noti-card ">
				<h5 class="card-header text-bg-dark">Dr.Kokila Jagadeesh</h5>
				<div class="card-body">
				  <h5 class="card-title">Lab Join Request</h5>
				  <div class="card-dashboard">
					<p class="card-text">Your request has been for joining lab under the faculty Kokila has been accepted</p>
				  <a href="#" class="btn btn-primary">Go To Lab</a>
				  </div>
				</div>
			  </div> */}
			  
		</div>
		</div>
			)
	
}

export default Faculty_Notification;