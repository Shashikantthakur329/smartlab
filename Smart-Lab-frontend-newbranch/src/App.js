import "./App.css";
import { useEffect, createContext, useReducer ,useContext} from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";


import Home from "./screens/home"
import Fdash from "./screens/Fdash"
import Student_Dashboard from "./screens/Sdash";
import Login from "./screens/login"
import Register from "./screens/register"
import Lab from "./screens/lab"
import Navbar from "./components/Navbar";
import Student_Notification from "./screens/notif";
import Faculty_Notification from "./screens/fnotif";
import SLab from "./screens/select";
import StudentLab from "./screens/Slab";
import Switch_Info from "./screens/switchinfo";
import test_table from "./screens/testtable";
export const UserContext=createContext();

const Routing = () => {
	const history = useNavigate();
	const {state,dispatch} = useContext(UserContext)

	return (
		<Routes>
			<Route exact path="/" element={<Home/>} />
			<Route exact path="/testtable" element={<test_table/>} />
			<Route exact path="/login" element={<Login/>}></Route>
			<Route exact path="/register" element={<Register/>} />
			<Route exact path="/Sdash" element={<Student_Dashboard/>} />
			<Route exact path="/Fdash" element={<Fdash/>} />
			<Route path="/lab" element={<Lab/>} />
			<Route exact path="/snotif" element={<Student_Notification/>} />
			<Route exact path="/switchinfo" element={<Switch_Info/>} />
			<Route exact path="/fnotif" element={<Faculty_Notification/>} />
			<Route exact path="/slab" element={<SLab></SLab>} />
			<Route exact path="/studentlab" element={<StudentLab></StudentLab>} />

		</Routes>
	)

}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

  return (
	
    <UserContext.Provider value={{ state, dispatch }}>
			<Router>
				<div className="App" >
				
					<div className="content">
						<Routing />
					</div>
				</div>
			</Router>
		</UserContext.Provider>
  );
}

export default App;
