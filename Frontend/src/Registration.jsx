import React ,{useState} from 'react'
import './Registration.css'
import { Link,useNavigate } from 'react-router-dom'

function Registration() {

	const nav = useNavigate();

	const [formData, setFormData] = useState({
		ukaname: '',
		ukapass: '',
		ukafullname: '',
		ukagoal: 0,
		ukaphone : '',
		ukaemail : ''
	  });

	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
		  ...prevState,
		  [name]: value
		}));
	  };
	

	const submit = (e)=>{
		e.preventDefault();
		fetch('http://localhost:8080/signup', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		  }).then(response => {
			console.log(response.status);
			return response.text();
		  }).then(data => {
			if(data === 'Successfully Inserted'){
				alert("User Registered Successfully");
				nav("/");
			}else if(data === 'Enter another UserName'){
				alert("User Already Exists");
				nav("/registration");
			}else{
				alert("Some Problem Occured")
				nav("/registration");
			}				
		  }).catch(error => {
			console.error('Error:', error);
			// Handle error here
		  });
		
		};

	return (
		<div id="firstdivs">
			<div className="containers">
				<div className="cards">
					<h2>Registration Form</h2>
					<form className="forms" onSubmit={submit}>
						<label className="namelabels">Name </label>
						<input
							className="inputfields"
							type="text"
							name="ukafullname"
							value={formData.ukafullname} 
          					onChange={handleChange}
							placeholder="Enter full name"
							required
						/>
						<div className="formborders"></div>
						<label className="userlabels">Username </label>
						<input
							className="inputfields"
							type="text"
							name="ukaname"
							value={formData.ukaname} 
          					onChange={handleChange}
							placeholder="Enter username"
							required
						/>
						<div className="formborders"></div>
						<label className="userlabels">Password </label>
						<input
							className="inputfields"
							type="password"
							name="ukapass"
							value={formData.ukapass} 
          					onChange={handleChange}
							placeholder="Enter password"
							required
						/>
						<div className="formborders"></div>
						<label className="userlabels">Goal Amount </label>
						<input
							className="inputfields"
							type="number"
							name="ukagoal"
							value={formData.ukagoal} 
          					onChange={handleChange}
							placeholder="Enter goal Amount"
							required
						/>
						<div className="formborders"></div>
						<label className="userlabels">Phone No </label>
						<input
							className="inputfields"
							type="number"
							name="ukaphone"
							value={formData.ukaphone} 
          					onChange={handleChange}
							placeholder="Enter phone number"
							required
						/>
						<div className="formborders"></div>
						<label className="userlabels">Email </label>
						<input
							className="inputfields"
							type="number"
							name="ukaemail"
							value={formData.ukaemail} 
          					onChange={handleChange}
							placeholder="Enter email"
							required
						/>
						<div className="formborders"></div>
						<input
							id="submit-btns"
							type="submit"
							name="submit"
							value="REGISTER"
						/>
						<Link to="/" id="signins">
							Already have account?
						</Link>
					</form>
				</div>
			</div>
		</div>
	)

};
export default Registration