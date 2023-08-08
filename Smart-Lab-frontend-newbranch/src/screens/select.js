import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "../components/Navbar";

const SLab=() => {

	const history = useNavigate();
	const [user,setuser] = useState(	JSON.parse(localStorage.getItem("user")))
	const [list,setlist] = useState([{id:1,name:"hello",state:true}])
    // const [selects,setSelects] = useState()
    var selected = [];
    React.useEffect(() => {
		getdata()
	}, []);
	
 
  const auth = localStorage.getItem("jwt"); 
  const getdata = async ()=> {
    try{
        // console.log("hi");
        let res= await fetch("/allLights",{
            headers: {
            // "Authorization": auth,
            },
        })
        let data = await res.json();
		
        if (data.error) {
            alert(data.error);
        } else {
            console.log(data);
            setlist(data.list)
            // console.log(list);
            
        }
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
                <h5 class="card-title">Faculty : {user.name}</h5>
                <a href="#" class="btn text-bg-success">Active</a>
                </div>
            </div>
            <div class="row row-cols-2 row-cols-md-4 g-4 d1">
                <div >
                    
                    {
                        list  && list.map(light => 
                            <div class="col">
                            <button onClick={() => {
                                selected.push(light)
                            
                            }

                            }>
                                light.name
                            </button>
                            </div>
                        )
                    }
                    <button onClick={() => {
                        // sethide(!hide);
                        // setfhide(!fhide)
                        localStorage.setItem("labs",JSON.stringify(selected))
                        history("/lab")
                    }}>Submit</button>
                
                </div>

                
                
            </div>
        </div>
    </div>
	)
	
}

export default SLab;