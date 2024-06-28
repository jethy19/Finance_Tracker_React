import React , {useState,useEffect} from 'react'
import {useNavigate,Link } from 'react-router-dom'
import './Login.css'

function setCookie(name, value, mins) {
	const expirationDate = new Date();
	expirationDate.setTime(expirationDate.getTime() + (mins * 60 * 1000));
	const expires = "expires=" + expirationDate.toUTCString();
	const cookieValue = `${name}=${value};${expires};path=/;SameSite=${'Lax'}`;
  	document.cookie = cookieValue;
  }

function getCookie (name)
{
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));   
	return cookies ? cookies.split("=")[1] : null;
}

function Login() {

const [input , setInput] = useState({username:"",password:""});
const navigate = useNavigate();

useEffect(() => {
	
    const token = getCookie('token');
    if (token) {
      const uname = getCookie('uname');
      navigate('/profile', { state: { fname: uname } });
    }
  }, [navigate]);



  
const changing = (e)=>{
	const name = e.target.name;
	const value = e.target.value;
	setInput(values =>({...values, [name]: value}));
}


const submitting = (e)=>{
	e.preventDefault();

	fetch('http://localhost:8080/signin', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"ukaname" : input.username,
			"ukapass" : input.password 
		})
	  }).then(response => {
		console.log(response.status);
		return response.text();
	  }).then(data => {
		if(data === 'Incorrect Credentials'){
			alert("Incorrect Username/Password");	
			navigate("/");				
		}else{
			setCookie("token",data, 19 );	
			setCookie("uname",input.username,19);	
			navigate("/profile",{state:{fname: getCookie("uname")}});
		}				
	  }).catch(error => {
		console.error('Error:', error);
	  })	
}

	return (
		<div id="firstdiv">
			<div className="container">
				<div className="card">
					<h2>Login</h2>
					<form className="form" onSubmit={submitting}>
						<label className="userlabel">Username </label>
						<input
							className="inputfield"
							type="text"
							name="username"
							placeholder="Enter the username"
							value= {input.username}
							onChange={changing}
							autoComplete="on"
							required
						/>
						<div className="formborder"></div>
						<label className="passlabel">Password </label>
						<input
							className="inputfield"
							type="password"
							name="password"
							placeholder="Enter the password"
							value={input.password}
							onChange={changing}
							autoComplete="on"
							required
						/>
						<div className="formborder"></div>
						<input
							id="submit-btn"
							type="submit"
							name="submit"
							value="LOGIN"
						/>

						<Link to="/registration" id="signup">
							Don't have account yet?
						</Link>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Login