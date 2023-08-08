import React,{useRef,useEffect,useState} from "react";
import { Toast,Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./home.css"

const Home=() => {


	const [modalState,setmodalState] = useState(localStorage.getItem("state")? false : true)
	const history=useNavigate()

	function openModal() {
		setmodalState(!modalState)
	}
	return (
		<div class="home" >
			 <header>
      <nav>
        <div class="row">
          <img class="logo" src="images/iotj.jpg" alt="logo" img />
          <ul class="main-nav">
            <li><a href="/login">Log in</a></li>
            <li><a href="/register">Sign Up</a></li>
          </ul>
        </div>
      </nav>
      <div class="hero_text_box">
        <h1 id="headtext">
          Internet Of Things<br />A Dawn To The Smart world!!
        </h1>
        <br />
        <a class="btn btn-full" href="#plans">IoT Lab</a>
        <a class="btn btn-ghost" href="#features">More Info </a>
      </div>
    </header>
		</div>
			
		)
    
}

export default Home;