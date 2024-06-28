import React from 'react'
import { useState ,useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUser,
	faLayerGroup,
	faBars,
	faHeadset,
	faRightFromBracket,
	faGear
} from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate} from 'react-router-dom'
import './Profile.css'
import User from './User'
import Setting from './Setting'
import Dashboard from './Dashboard'
import Welcome from './Welcome'
import Support from './Support'
import LogoutTimer from './LogoutTimer';


function setCookie(name, value, mins) {
	const expirationDate = new Date();
	expirationDate.setTime(expirationDate.getTime() + (mins * 60 * 1000));
	const expires = "expires=" + expirationDate.toUTCString();
	const cookieValue = `${name}=${value};${expires};path=/;SameSite=${'Lax'}`;
	localStorage.setItem('localgoal', JSON.stringify(cookieValue));
	document.cookie = cookieValue;
}

function removeCookies(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function getCookie (name)
{
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));   
	return cookies ? cookies.split("=")[1] : null;
}

function Profile() {

	const navigation = useNavigate()
	useEffect(() => {
		const token = getCookie('token');
		if (token === null) {
			removeCookies("token");
			removeCookies("uname");
			removeCookies("goal");
			removeCookies("money");
			localStorage.removeItem("localgoal");
			alert("Token Expired and Logged Out")
			navigation("/");
			window.location.reload();	
		}else{
			fetch('http://localhost:8080/fetchdet', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: getCookie("uname")
			}).then(response => {
				console.log(response.status);
				return response.json();
			}).then(data => {
				const d = parseFloat(data.ukagoal);
				const m = parseFloat(data.money)
				setCookie("goal", d,22);
				setCookie("money",m,22);
			}).catch(error => {
				console.error('Error:', error);
			})
		}
	  }, [navigation]);


	const loc = useLocation()
	const data = loc.state.fname.toUpperCase()
	
	const [userp, setUserp] = useState(false)
	const [settp,setSettp] = useState(false);
	const [dashp, setDashp] = useState(false)
	const [supp,setSupp] = useState(false);
	const [welcomep,setWelcomep] = useState(true);
	const [menuc, setMenuc] = useState('navcontainer')
	const [dashstate, setDashstate] = useState('nav-option option1')
	const [settstate,setSettstate] = useState('nav-option option2')
	const [supportstate,setSupportstate] = useState('nav-option option3')
	
	function settinguser() {
		setSupp(false)
		setSettp(false)
		setDashp(false)
		setWelcomep(false)
		setDashstate('nav-option option1')
		setSettstate('nav-option option2')
		setSupp(false)
		setSupportstate('nav-option option3')		
		setUserp(true)
	}
	function men() {
		if (menuc !== 'navcontainer') {
			setMenuc('navcontainer')
		} else {
			setMenuc('navclose')
		}
	}

	function dash() {		
		setSettp(false);
		setWelcomep(false)
		setUserp(false);
		setSupp(false)
		setSupportstate('nav-option option3')
		setSettstate('nav-option option2')
		setDashstate('nav-option option1c')
		setDashp(true)

	}

	function sett() {
		setDashp(false)
		setWelcomep(false)
		setDashstate('nav-option option1')
		setUserp(false)
		setSupp(false)
		setSupportstate('nav-option option3')
		setSettp(true)
		setSettstate('nav-option option2c')
	}
	function logout() {
		removeCookies("token");
		removeCookies("uname");
		removeCookies("goal");
		removeCookies("money");
		localStorage.removeItem("localgoal");
		navigation("/");
		window.location.reload();
	}

	function support(){
		setDashp(false)
		setDashstate('nav-option option1')
		setUserp(false)
		setSettp(false)
		setSettstate('nav-option option2')
		setWelcomep(false)
		setSupp(true)
		setSupportstate('nav-option option3c')		
	}

	function resetp(){
		setDashp(false)
		setDashstate('nav-option option1')
		setUserp(false)
		setSettp(false)
		setSettstate('nav-option option2')
		setSupp(false)
		setSupportstate('nav-option option3')
		setWelcomep(true)
		setMenuc('navcontainer')
	}

	return (
		<div>
			<LogoutTimer timeout={600000} />
			<div className="navbar">
				<div className="menu">
					<div id="houseicon">
						<button id="barbtn" onClick={men}>
							<FontAwesomeIcon icon={faBars} size="2x" />
						</button>
						<div id="appname" onClick={resetp}>
							<strong>FinanceTracker</strong>
						</div>
					</div>
				</div>
				<div className="rightside">
					<div className="dropdown">
						<div id="icon">
							<FontAwesomeIcon
								icon={faUser}
								size="2x"
								color="white"
							/>
						</div>
						<div className="dropdown-content">
							<div>
								<button id="p" onClick={settinguser}>
									My Profile
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="main-container">
				<div className={menuc}>
					<nav className="nav">
						<div className="nav-upper-options">
							<div onClick={dash} className={dashstate}>
								<FontAwesomeIcon
									icon={faLayerGroup}
									size="2x"
								/>
								<h3 style={{fontWeight: 'bold'}}>Dashboard</h3>
							</div>
							<div onClick={sett} className={settstate}>
								<FontAwesomeIcon icon={faGear} size="2x" />
								<h3 style={{fontWeight: 'bold'}}>Settings</h3>
							</div>
							<div onClick={support} className={supportstate}>
								<FontAwesomeIcon icon={faHeadset} size="2x"/>
								<h3 style={{fontWeight: 'bold'}}>Support</h3>
							</div>
							<div onClick={logout} className="nav-option logout">
								<FontAwesomeIcon
									icon={faRightFromBracket}
									size="2x"
								/>
								<h3 style={{fontWeight: 'bold'}}>Logout</h3>
							</div>
						</div>
					</nav>
				</div>
				<div className="main">					
						{welcomep ? <div style={{width:"100%",height:"100%"}}><Welcome data={data}/></div> : null}
						{userp ? <div style={{width: "100%",display:"flex",marginTop:"10px",justifyContent:"center"}}><User /> </div> : null}
						{dashp ? <div style={{position: "relative",width: "100%"}}><Dashboard /></div> : null}
						{settp ? <div><Setting /> </div>: null}
						{supp ? <div><Support/> </div>: null}					
				</div>
			</div>
		</div>
	)
}

export default Profile
