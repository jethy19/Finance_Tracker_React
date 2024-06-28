import React,{useState,useEffect}from "react";
import './User.css'
import uimg from './profile.png'
import  {useNavigate} from 'react-router-dom'
import swal from '@sweetalert/with-react';


function getCookie (name)
{
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));   
	return cookies ? cookies.split("=")[1] : null;
}

function removeCookies(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}


function User(){

    const [f,setF] = useState('')
    const [u,setU] = useState('')
    const [p,setP] = useState('')
    const [e,setE] = useState('')
    const [g,setG] = useState('')

    const showpop = ()=>{
        swal(
            <div>
              <h3>Information</h3>        
              <p>To Edit please visit Settings</p>
            </div>
          )
    }

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
			fetch('http://localhost:8080/fetchuserdetails', {
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
				setF(data.ukafullname)
                setU(data.ukaname)
                setP(data.ukaphone)
                setE(data.ukaemail)
                setG('₹ '+data.ukagoal)
			}).catch(error => {
				console.error('Error:', error);
			})
		}
	  }, [navigation]);

    return(
        <div className="userprofile">
            <div className="circle">
            <img height="120" width="120" src={uimg} alt="Cloud Chen"/>
            </div>
            <div className="labelfields">
                <label>FullName </label><br/>
                <input type="text" value={f} name="userkafname" readOnly={true}/>
            </div>
            <div className="labelfields">
                <label>Username </label><br/>
                <input type="text" value={u} name="userkaname" readOnly={true}/>
            </div>
            <div className="labelfields">
                <label>Goal </label><br/>
                <input type="text" value={g} name="userkagoal" readOnly={true}/>
            </div>
            <div className="labelfields">
                <label>Phone No </label><br/>
                <input type="text" value={p} name="userkaphone" readOnly={true}/>
            </div>
            <div className="labelfields">
                <label>Email </label><br/>
                <input type="text" value={e} name="userkaemail" readOnly={true}/>
            </div>
            <div className="labelfields">
                <button className="button-42" onClick={showpop}><strong>EDIT</strong></button>            
            </div>
        </div>
    )
}

export default User