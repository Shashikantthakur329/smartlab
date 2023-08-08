import { useContext } from "react";
import { UserContext } from "../App";
import React,{useRef,useEffect,useState} from "react";
import { Toast,Modal,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


function MapModal (props) {
	const show = props.show
	const action=props.action
	const [hide,sethide] = useState(false);
	const [fhide,setfhide] = useState(false);

	return (
		<div>

			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Select your Role: </Modal.Title>
				</Modal.Header>
				<Modal.Body >	
						<div className="modall" >
							<div style={ {display:"flex", flexDirection: "row"}}>

								<div className={hide ? "vcard hide" : "vcard"}  id="fac">
									<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-video3" viewBox="0 0 16 16">
										<path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z"/>
										<path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z"/>
									</svg>
									<button type="button" className="btn btn-primary " onClick={() => {
										localStorage.setItem("userType","faculty");
										setfhide(!fhide);
									}}
										>
										Faculty
									</button>
										
								</div>
								<div className={fhide ? "vcard hide" : "vcard"} id="std">
									<svg xmlns="http://www.w3.org/2000/svg" width="95" height="95" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
										<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
									</svg>
									<button type="button" className="btn btn-primary" onClick={() => {
										localStorage.setItem("userType","student");
										sethide(!hide);
									}}
									>
										Student
									</button>
										
								</div>
							</div>				
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={action()}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div> 
	)
}


const Navbar = () => {
	let { state, dispatch } = useContext(UserContext);
	const history = useNavigate()
	let jwt = localStorage.getItem("jwt")
	if(jwt) {
		state=true;
	}
	const [modalState,setmodalState] = useState(state? false : true)

	function openModal() {
		setmodalState(!modalState)
	}

	const userType=localStorage.getItem("userType")


	const renderList = () => {
		if (state) {
			return [
				<span>
					
					<Link to={userType=="student" ? "/snotif" : "/fnotif"}>Notifications</Link>
					{ userType=="faculty" ? <span><Link to="/switchinfo">students_info</Link><Link to="/newPost">new lab</Link><Link to="/fDash">Dashboard</Link></span> : <span><Link to="/sDash">Dashboard</Link></span>}
					<button className="btn btn-primary" onClick={() => {
							localStorage.clear();
							dispatch({type:"CLEAR"})
							history('/')
						}
						}>
						Logout
					</button>
				
				</span>
			];
		} else {
			return [
				<span>
					<Link to="/login">login</Link>
					<Link to="/register">sign up</Link>
					
				</span>,
			];
		}
	};

	return (
		<nav className="navbar">
			<h2 className="logo">
				<Link to="/"> Smart Lab</Link>{" "}
			</h2>
			<div className="navlinks">{renderList()}</div>
			<MapModal show = {modalState} action={() => openModal} onHide={() => setmodalState(false)}></MapModal>

		</nav>
		
		
	);
};

export default Navbar;
