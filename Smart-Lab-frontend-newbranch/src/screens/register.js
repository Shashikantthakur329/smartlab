import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Register = () => {
	const history = useNavigate();
	const [name, setName] = useState("");
	const [phoneNumber, setphoneNumber] = useState("");
	const [RollNo, setRollNo] = useState("");
	const [password, setpassword] = useState("");
	const [user, setUser] = useState("");


	const userType = localStorage.getItem("userType");
	if (!userType) history("/");

	const PostData = async () => {
		if (userType == "faculty") {

			try {
				let res = await fetch("/facultysignup", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						phoneNumber,
						password,
						// RollNo
					}),
				})
				let data = await res.json();

				if (data.error) {
					console.log(data);
					alert(data.error);

				} else {
					alert(data.success);
					history("/login");
				}
			}
			catch (err) {
				console.log("There is some error", err);
			}
		} else {
			try {
				let res = await fetch("/studentsignup", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						rollNumber: RollNo,
						password,
					}),
				})
				let data = await res.json();

				if (data.error) {
					console.log(data);
					alert(data.error);

				} else {
					alert(data.success);
					history("/login");
				}
			}
			catch (err) {
				console.log("There is some error", err);
			}
		}
	};

	return (
		<div><Navbar></Navbar>
			<div className="mycard">
				<div className="card auth-card ">
					<h2>Registration</h2>
					{
						userType == "student" ? <p className="card-text">
							<input
								type="text"
								name="rollNo"
								id="rollNo"
								placeholder="Roll No"
								value={RollNo}
								onChange={(e) => setRollNo(e.target.value)}
							/>
						</p> : <div><p></p>
							<p className="card-text">
								<input
									type="text"
									name="name"
									id="name"
									placeholder="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</p>
							<p className="card-text">
								<input
									type="text"
									name="phoneNumber"
									id="phoneNumber"
									placeholder="phoneNumber"
									value={phoneNumber}
									onChange={(e) => setphoneNumber(e.target.value)}
								/>
							</p> </div>
					}
				 {/*  */}
					<p className="card-text">
						<input
							type="password"
							name="password"
							id="password"
							placeholder="password"
							value={password}
							onChange={(e) => setpassword(e.target.value)}
						/>
					</p>


					<button className="btn btn-primary" onClick={() => PostData()}>
						Sign Up
					</button>

					<p>
						<Link to="/login"> Already have an account?</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
