import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Navbar from "../components/Navbar";
import getdevicedetails from "../components/getdevicedetails.js";

// const getdevicedetails = () => {
// 	var unknown = 'Unknown';

// 	// var screen=""
// 	// var width=""
// 	// var height=""

// 	var screenSize = '';
// 	// if (screen.width) {
// 	// 	width = (screen.width) ? screen.width : '';
// 	// 	height = (screen.height) ? screen.height : '';
// 	// 	screenSize += '' + width + " x " + height;
// 	// }

// 	//browser
// 	var nVer = navigator.appVersion;
// 	var nAgt = navigator.userAgent;
// 	var browser = navigator.appName;
// 	var version = '' + parseFloat(navigator.appVersion);
// 	var majorVersion = parseInt(navigator.appVersion, 10);
// 	var nameOffset, verOffset, ix;

// 	// Opera
// 	if ((verOffset = nAgt.indexOf('Opera')) != -1) {
// 		browser = 'Opera';
// 		version = nAgt.substring(verOffset + 6);
// 		if ((verOffset = nAgt.indexOf('Version')) != -1) {
// 			version = nAgt.substring(verOffset + 8);
// 		}
// 	}

// 	// MSIE
// 	else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
// 		browser = 'Microsoft Internet Explorer';
// 		version = nAgt.substring(verOffset + 5);
// 	}

// 	//IE 11 no longer identifies itself as MS IE, so trap it
// 	//http://stackoverflow.com/questions/17907445/how-to-detect-ie11
// 	else if ((browser == 'Netscape') && (nAgt.indexOf('Trident/') != -1)) {

// 		browser = 'Microsoft Internet Explorer';
// 		version = nAgt.substring(verOffset + 5);
// 		if ((verOffset = nAgt.indexOf('rv:')) != -1) {
// 			version = nAgt.substring(verOffset + 3);
// 		}

// 	}

// 	// Chrome
// 	else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
// 		browser = 'Chrome';
// 		version = nAgt.substring(verOffset + 7);
// 	}
// 	// Safari
// 	else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
// 		browser = 'Safari';
// 		version = nAgt.substring(verOffset + 7);
// 		if ((verOffset = nAgt.indexOf('Version')) != -1) {
// 			version = nAgt.substring(verOffset + 8);
// 		}

// 		// Chrome on iPad identifies itself as Safari. Actual results do not match what Google claims
// 		//  at: https://developers.google.com/chrome/mobile/docs/user-agent?hl=ja
// 		//  No mention of chrome in the user agent string. However it does mention CriOS, which presumably
// 		//  can be keyed on to detect it.
// 		if (nAgt.indexOf('CriOS') != -1) {
// 			//Chrome on iPad spoofing Safari...correct it.
// 			browser = 'Chrome';
// 			//Don't believe there is a way to grab the accurate version number, so leaving that for now.
// 		}
// 	}
// 	// Firefox
// 	else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
// 		browser = 'Firefox';
// 		version = nAgt.substring(verOffset + 8);
// 	}
// 	// Other browsers
// 	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
// 		browser = nAgt.substring(nameOffset, verOffset);
// 		version = nAgt.substring(verOffset + 1);
// 		if (browser.toLowerCase() == browser.toUpperCase()) {
// 			browser = navigator.appName;
// 		}
// 	}
// 	// trim the version string
// 	if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
// 	if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
// 	if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

// 	majorVersion = parseInt('' + version, 10);
// 	if (isNaN(majorVersion)) {
// 		version = '' + parseFloat(navigator.appVersion);
// 		majorVersion = parseInt(navigator.appVersion, 10);
// 	}

// 	// mobile version
// 	var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

// 	// cookie
// 	var cookieEnabled = (navigator.cookieEnabled) ? true : false;

// 	if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
// 		document.cookie = 'testcookie';
// 		cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
// 	}

// 	// system
// 	var os = unknown;
// 	var clientStrings = [
// 		{ s: 'Windows 3.11', r: /Win16/ },
// 		{ s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
// 		{ s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
// 		{ s: 'Windows 98', r: /(Windows 98|Win98)/ },
// 		{ s: 'Windows CE', r: /Windows CE/ },
// 		{ s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
// 		{ s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
// 		{ s: 'Windows Server 2003', r: /Windows NT 5.2/ },
// 		{ s: 'Windows Vista', r: /Windows NT 6.0/ },
// 		{ s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
// 		{ s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
// 		{ s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
// 		{ s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
// 		{ s: 'Windows ME', r: /Windows ME/ },
// 		{ s: 'Android', r: /Android/ },
// 		{ s: 'Open BSD', r: /OpenBSD/ },
// 		{ s: 'Sun OS', r: /SunOS/ },
// 		{ s: 'Linux', r: /(Linux|X11)/ },
// 		{ s: 'iOS', r: /(iPhone|iPad|iPod)/ },
// 		{ s: 'Mac OS X', r: /Mac OS X/ },
// 		{ s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
// 		{ s: 'QNX', r: /QNX/ },
// 		{ s: 'UNIX', r: /UNIX/ },
// 		{ s: 'BeOS', r: /BeOS/ },
// 		{ s: 'OS/2', r: /OS\/2/ },
// 		{ s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
// 	];
// 	for (var id in clientStrings) {
// 		var cs = clientStrings[id];
// 		if (cs.r.test(nAgt)) {
// 			os = cs.s;
// 			break;
// 		}
// 	}

// 	var osVersion = unknown;

// 	if (/Windows/.test(os)) {
// 		osVersion = /Windows (.*)/.exec(os)[1];
// 		os = 'Windows';
// 	}

// 	switch (os) {
// 		case 'Mac OS X':
// 			osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
// 			break;

// 		case 'Android':
// 			osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
// 			break;

// 		case 'iOS':
// 			osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
// 			osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
// 			break;

// 	}

// 	var browserInfo = {
//         screen: screenSize,
//         browser: browser,
//         browserVersion: version,
//         mobile: mobile,
//         os: os,
//         osVersion: osVersion,
//         cookies: cookieEnabled
//     };
// 	console.log(browserInfo);
// 	alert(browserInfo);
// }

const Login = () => {
	const history = useNavigate();
	const [phoneNumber, setphoneNumber] = useState("");
	const [roll, setroll] = useState("")
	const [password, setpassword] = useState("");
	const { state, dispatch } = useContext(UserContext);
	const [viewNotif, setviewNotif] = useState(false);
	const [color, setcolor] = useState("green");
	const toggleviewNotif = () => {
		setviewNotif(!viewNotif);
		// history("/")                                                          
	}

	const devices = {
		choose_device_type: ' ',
		phone: 'phone',
		laptop: 'laptop',
		desktop: 'desktop',
	}

	const [devicetypeOption, setDevice] = useState("");


	const [user, setUser] = useState("");
	const userType = localStorage.getItem("userType");
	// if(!userType) history("/");
	const PostData = async () => {
		if (!userType) {
			alert("please referesh and select user type")
			return
		}

		// var parser = new UAParser();
		var devicedetails = getdevicedetails();
		// alert(devicedetails['os']);
		// alert(window.navigator.userAgent);
		if (userType == "faculty") {
			try {
				// alert(window.navigator.platform);
				let res = await fetch("/facultysignin", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						phoneNumber,
						password,

					}),
				})
				let data = await res.json();
				// console.log();
				if (data.error) {
					alert(data.error);
				} else {
					// let ress = fetch("/facultysignin/", {
					// 	method: "get",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body:"shashikant",
					// })
					// let dataa = await ress.json();

					console.log("login success")
					console.log(data);
					localStorage.setItem("jwt", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					dispatch({ type: "USER", payload: data.user });

					history("/Fdash")
				}
			}
			catch (err) {
				console.log(err);
			}
		}
		else {
			const login_var = "login_attempt"
			console.log(devicedetails);
			const os = devicedetails['os'];
			const browser = devicedetails['browser'];
			const mobile = devicedetails['mobile'];
			console.log(devicetypeOption);
			
			// alert(browser);
			// alert(os);
			try {
				let res = await fetch("/studentsignin", {
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						rollNumber: roll,
						password,
						login_var,
						os,
						browser,
						mobile,
						devicetypeOption
					}),
				})

				let data = await res.json();
				// console.log();
				if (data.error) {
					alert(data.error);
				} else {
					localStorage.setItem("jwt", data.token);
					localStorage.setItem("user", JSON.stringify(data.user));
					dispatch({ type: "USER", payload: data.user });
					// alert(devicedetails);
					history("/Sdash")
				}
			}
			catch (err) {
				console.log(err);
			}
		}
	};



	return (
		<div>
			<Navbar></Navbar>

			<div className="mycard">
				<div className="card auth-card">
					<h2>Login</h2>
					<p className="card-text">
						{userType == "faculty" ?
							<input
								type="text"
								placeholder="Phone Number"
								value={phoneNumber}
								onChange={(e) => setphoneNumber(e.target.value)}
							/> :
							<input
								type="text"
								placeholder="rollNO"
								value={roll}
								onChange={(e) => setroll(e.target.value)}
							/>

						}
					</p>
					<p className="card-text">
						<input
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) => setpassword(e.target.value)}
						/>
					</p>
					<p className="card-select">
						{userType == "student" ?
							// <select name="pets" id="pet-select" value={devicetypeOption}>
							// 	<option value="">Choose your device</option>
							// 	<option value="laptop">laptop</option>
							// 	<option value="desktop">desktop</option>
							// 	<option value="phone">phone</option>
							// </select>:
							<select value={devicetypeOption} onChange={e => setDevice(e.target.value)}>
								{Object.entries(devices).map(c => (
									<option value={c[1]}>{c[0]}</option>
								))}
							</select> :
							// />:
							<p></p>

						}
					</p>
					<button className="btn btn-primary" onClick={() => PostData()}>
						Login
					</button>
					<p>
						<Link to="/register"> Don't have an account?</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
