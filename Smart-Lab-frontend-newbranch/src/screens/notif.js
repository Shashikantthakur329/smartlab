import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toast,Modal,Button } from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const Student_Notification=() => {

	const history = useNavigate()
	  
	  const user = JSON.parse(localStorage.getItem("user"))
	  const jwt = localStorage.getItem("jwt")
	  const [Notifications , setNotifications] = React.useState(user.notification)
	  const reqA = async() => {
		try{
			let res= await fetch("/acceptstudentrequest", {
				headers:{
					"authorization" : jwt
				}
			})
			// if(res.Accepted) {
				history("/Fdash")
			// }/
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
        { Notifications ? Notifications.map((Notification) =>  

          <div>
          <div class="card noti-card ">
          <h5 class="card-header text-bg-dark">{Notification.labId}</h5>
          <div class="card-body">
            <h5 class="card-title">Lab Join Request</h5>
            <div class="card-dashboard">
              <p class="card-text">{Notification.message}</p>
            
            {Notification.Accepted && ( 
            <div>
            <Link to = {`/lab`}>
            <div  class="btn btn-primary"> Go To Lab </div>
            </Link>
            </div>
            )}
            </div>
          </div>
          </div>

          </div>
        ) : <div class="card noti-card ">
        <h5 class="card-header text-bg-dark">Dr.Kokila Jagadeesh</h5>
        <div class="card-body">
          <h5 class="card-title">Lab Join Request</h5>
          <div class="card-dashboard">
            <p class="card-text">Your request has been for joining lab under the faculty Kokila has been accepted</p>
          <a href="#" class="btn btn-primary">Go To Lab</a>
          </div>
        </div>
      </div> 
      
      }
       
          {/* */}
          
    </div>
    </div>
		)
	
}

export default Student_Notification;