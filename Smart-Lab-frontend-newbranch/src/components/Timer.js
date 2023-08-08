import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

function Timer({max}){
	const history = useNavigate()
    const [counter, setCounter] = useState(max);
	const userType= localStorage.getItem("userType")
    useEffect(() =>{
        if(counter > 0){
            setTimeout(()=>setCounter(counter - 1), 1000);
        }
		else {
			alert("Lab time complete")
			fetch("/lightOff", {
				method: "post",
			headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id:"1"
				}),
			}).then(res => res.json())
			.then((data) => {
				if(data.err) alert(data.err);
				else console.log(data);
			})

			if(userType=="student") history('/Sdash')
			else history('/Fdash')
		}
    },[counter]);

    return(
        <h2><span> Timer:
            {counter}
        </span></h2>
    )
}

export default Timer;