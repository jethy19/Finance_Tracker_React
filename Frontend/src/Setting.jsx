import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Setting.css'

function getCookie(name) {
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
	return cookies ? cookies.split("=")[1] : null;
}

function removeCookies(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}


function Setting() {

	const [num, setNum] = useState(parseFloat(getCookie("goal")))
	const [f, setF] = useState("")
	const [p, setP] = useState("")
	const [e, setE] = useState("")
	const [changefb, setChangefb] = useState(false)
	const [changegb, setChangegb] = useState(false)
	const [changepb, setChangepb] = useState(false)
	const [changeeb, setChangeeb] = useState(false)
	const [usevariable, setUsevariable] = useState("")

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
		} else {
			fetch('http://localhost:8080/fetchudetails', {
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
				setP(data.ukaphone)
				setE(data.ukaemail)
				setUsevariable('')
			}).catch(error => {
				console.error('Error:', error);
			})
		}
	}, [navigation, usevariable]);


	const numchange = (e) => {
		setNum(e.target.value)
	}

	const fchange = (e) => {
		setF(e.target.value)
	}

	const pchange = (e) => {
		setP(e.target.value)
	}

	const echange = (e) => {
		setE(e.target.value)
	}


	const handlelimit = () => {
		if (changegb === false) {
			setChangegb(true)
		} else {
			if (num < 0) {
				alert("Goal value should be positive")
			} else if (num === '') {
				alert("Goal cannot be empty")
			}
			else {
				if (getCookie("token") === null) {
					removeCookies("token");
					removeCookies("uname");
					removeCookies("goal");
					removeCookies("money");
					localStorage.removeItem("localgoal");
					alert("Token Expired and Logged Out")
					navigation("/");
					window.location.reload();
				} else {
					fetch('http://localhost:8080/settingchange', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': getCookie("token")
						},
						body: JSON.stringify(
							{
								"ukaname": getCookie("uname"),
								"ukafullname": f,
								"ukagoal": num,
								"ukaphone" : p,
								"ukaemail" : e
							}
						)
					}).then(response => {
						console.log(response.status);
						return response.text();
					}).then(data => {
						if (data === 'Updated Successfully') {
							alert("Successfully Updated Goal");
						} else {
							alert("Not Updated Fullname");
						}
					}).catch(error => {
						console.error('Error:', error);
					});
					setUsevariable("changed goal");
					setChangegb(false)
				}
			}
		}
	}

	const handlefullname = () => {
		if (changefb === false) {
			setChangefb(true)
		} else {
			if (f === '') {
				alert("FullName cannot be empty")
			} else {
				if (getCookie("token") === null) {
					removeCookies("token");
					removeCookies("uname");
					removeCookies("goal");
					removeCookies("money");
					localStorage.removeItem("localgoal");
					alert("Token Expired and Logged Out")
					navigation("/");
					window.location.reload();
				} else {
					fetch('http://localhost:8080/settingchange', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': getCookie("token")
						},
						body: JSON.stringify(
							{
								"ukaname": getCookie("uname"),
								"ukafullname": f,
								"ukagoal": num,
								"ukaphone" : p,
								"ukaemail" : e
							}
						)
					}).then(response => {
						console.log(response.status);
						return response.text();
					}).then(data => {
						if (data === 'Updated Successfully') {
							alert("Successfully Updated Fullname");
						} else {
							alert("Not Updated Fullname");
						}
					}).catch(error => {
						console.error('Error:', error);
					});
					setUsevariable("changed fullname");
					setChangefb(false)
				}
			}

		}
	}

	const handlephone = () => {
		if (changepb === false) {
			setChangepb(true)
		} else {
			if (p === '') {
				alert('Phone No can not be empty')
			} else {
				if (getCookie("token") === null) {
					removeCookies("token");
					removeCookies("uname");
					removeCookies("goal");
					removeCookies("money");
					localStorage.removeItem("localgoal");
					alert("Token Expired and Logged Out")
					navigation("/");
					window.location.reload();
				}else{
					fetch('http://localhost:8080/settingchange', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': getCookie("token")
						},
						body: JSON.stringify(
							{
								"ukaname": getCookie("uname"),
								"ukafullname": f,
								"ukagoal": num,
								"ukaphone" : p,
								"ukaemail" : e
							}
						)
					}).then(response => {
						console.log(response.status);
						return response.text();
					}).then(data => {
						if (data === 'Updated Successfully') {
							alert("Successfully Updated PhoneNo");
						} else {
							alert("Not Updated Fullname");
						}
					}).catch(error => {
						console.error('Error:', error);
					});
					setUsevariable("changed phoneno");
					setChangepb(false)
				}								
			}
		}
	}

	const handlemail = ()=>{
		if (changeeb === false) {
			setChangeeb(true)
		} else {
			if (e === '') {
				alert('Phone No can not be empty')
			} else {
				if (getCookie("token") === null) {
					removeCookies("token");
					removeCookies("uname");
					removeCookies("goal");
					removeCookies("money");
					localStorage.removeItem("localgoal");
					alert("Token Expired and Logged Out")
					navigation("/");
					window.location.reload();
				}else{
					fetch('http://localhost:8080/settingchange', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': getCookie("token")
						},
						body: JSON.stringify(
							{
								"ukaname": getCookie("uname"),
								"ukafullname": f,
								"ukagoal": num,
								"ukaphone" : p,
								"ukaemail" : e
							}
						)
					}).then(response => {
						console.log(response.status);
						return response.text();
					}).then(data => {
						if (data === 'Updated Successfully') {
							alert("Successfully Updated Email");
						} else {
							alert("Not Updated Fullname");
						}
					}).catch(error => {
						console.error('Error:', error);
					});
					setUsevariable("changed email");
					setChangeeb(false)
				}								
			}
		}
	}

	return (
		<div>
			<h2 id="settingh2"> Settings </h2>
			<div className='cardsetting'>

				<div>
					<label>FullName</label>&nbsp;
					<input type='text' name='fullname' value={f} onChange={fchange} readOnly={!changefb} required /> &nbsp;&nbsp;&nbsp;
					<button onClick={handlefullname}>{(changefb) ? "Save" : "Change"}</button>
				</div>
				<div>
					<label>Goal </label>&nbsp;
					<input type="number" name="limitnum" min='0' value={num} onChange={numchange} readOnly={!changegb} />&nbsp;&nbsp;&nbsp;
					<button onClick={handlelimit}>{(changegb) ? "Set" : "Change"}</button>
				</div>
				<div>
					<label>Phone No </label>&nbsp;
					<input type="text" name="phoneno" pattern="[0-9]{10}" value={p} onChange={pchange} readOnly={!changepb} />&nbsp;&nbsp;&nbsp;
					<button onClick={handlephone}>{(changepb) ? "Set" : "Change"}</button>
				</div>
				<div>
					<label>Email ID </label>&nbsp;
					<input type="email" name="emailid" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" value={e} onChange={echange} readOnly={!changeeb} />&nbsp;&nbsp;&nbsp;
					<button onClick={handlemail}>{(changeeb) ? "Set" : "Change"}</button>
				</div>
			</div>
		</div>
	)
}

export default Setting