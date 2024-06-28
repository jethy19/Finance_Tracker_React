import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import SplitPane from 'react-split-pane'
import { useNavigate } from 'react-router-dom'
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { PiEqualsFill } from 'react-icons/pi'
import './Dashboard.css'

Chart.register(ArcElement, Tooltip, Legend, Title)
Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0,0)'
Chart.defaults.plugins.legend.position = 'right'
Chart.defaults.plugins.legend.title.display = true
Chart.defaults.plugins.legend.title.font = 'Helvetica Neue'

function getCookie(name) {
	const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
	return cookies ? cookies.split("=")[1] : null;
}

function removeCookies(name) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

function updateCookie(name, newValue) {
	let parts = localStorage.getItem("localgoal").split(';').filter(part => !part.includes('goal=')).join(';');
	document.cookie = `${name}=${newValue};${parts}`;
}



function Dashboard() {


	const [det, setDet] = useState('')
	const [amt, setAmt] = useState(1.0)
	const [categ, setCateg] = useState('Grocery')
	const [ttype, setTtype] = useState('Credit')
	const [dat, setDat] = useState('')
	const [usepurpose, setUsepurpose] = useState('')
	const navigation = useNavigate()
	const [globalmoney,setGlobalmoney] = useState(0.0)
	const [globallev,setGloballev] = useState(0.0)

	const savetransaction = (d, a, c, tt, da) => {
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

			fetch('http://localhost:8080/saverecord', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				},
				body: JSON.stringify({
					"usename": getCookie("uname"),
					"details": d,
					"amount": a,
					"dcategory": c,
					"ttype": tt,
					"tdate": da
				})
			}).then(response => {
				console.log(response.status);
				return response.text();
			}).then(data => {
				if (data === 'Successfully Inserted Data') {
					alert("Transaction Addedd Successfully");
					setUsepurpose("data saved")
				} else {
					alert("Data Not Saved try again")
				}
			}).catch(error => {
				console.error('Error:', error);
			})

			setDet('');
			setAmt(1);
			setCateg('Grocery');
			setTtype('Credit');
			setDat('');
			setUsepurpose('')
		}
		// Note: No need to trigger the fetch here, useEffect will handle it
	};

	const [record, setRecord] = useState([])
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
			fetch('http://localhost:8080/getrecord', {
				method: 'POST',
				headers: {
					'Content-Type': 'text/plain',
					'Authorization': getCookie("token")
				},

				body: getCookie("uname")
			}).then(response => {
				console.log(response.status);
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Failed to fetch data');
				}
			}).then(data => {
				setRecord(data);
			}).catch(error => {
				console.error('Error:', error);
			});

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
				const d = parseFloat(data.ukagoal)
				console.log(d)
				
				const m = parseFloat(data.money)
				console.log(m)
				updateCookie("goal", d);
				updateCookie("money",m);
				setGlobalmoney(parseFloat(getCookie("money")).toFixed(2))
				setGloballev(parseFloat(getCookie("goal")).toFixed(2))
			}).catch(error => {
				console.error('Error:', error);
			})

		}


	}, [usepurpose, navigation]);



	var money = 0.0
	var expense = 0.0
	var grocery,
		food,
		donation,
		bill,
		investment,
		services,
		healthcare,
		shopping,
		fuel,
		others

	grocery =
		food =
		donation =
		bill =
		investment =
		services =
		healthcare =
		shopping =
		fuel =
		others =
		0
	function displayicon() {
		if (globallev === -1) {
			return <IoIosRemoveCircleOutline style={{ color: 'red' }} />
		} else if (globalmoney === globallev) {
			return <PiEqualsFill style={{ color: 'brown' }} />
		} else if (globalmoney > globallev) {
			return <FaArrowTrendUp style={{ color: 'green' }} />
		} else if (globalmoney < globallev) {
			return <FaArrowTrendDown style={{ color: 'red' }} />
		}
	}

	function displaygoal() {
		if (globallev === -1 || globallev === globalmoney) {
			return 'Goal Achieved'
		} else {
			if (globalmoney > globallev) {
				return (globalmoney - globallev).toFixed(2)
			} else {
				return (globallev - globalmoney).toFixed(2)
			}
		}
	}

	function onDelete(sno) {
		const token = getCookie("token");
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
			fetch('http://localhost:8080/deleterecord', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': getCookie("token")
				},
				body: JSON.stringify(sno)
			}).then(response => {
				console.log(response.status);
				return response.text();
			}).then(data => {
				if (data === 'Successfully Deleted') {
					alert("Transaction Deleted Successfully");
					setUsepurpose("data deleted");
				} else {
					alert("Not Deleted");
				}
			}).catch(error => {
				console.error('Error:', error);
			})
			setUsepurpose('')
		}
	}

	const handleDelete = (sno,stypee,creditamt) => {
		if(stypee === 'Credit'){
			if(((expense+money)-creditamt).toFixed(2) < expense.toFixed(2)){
				alert("Cannot Delete your Balance will be negative")
			}else{
				onDelete(sno);
			}
		}else{
			if (window.confirm("Do you want to delete?")) {
				onDelete(sno);
			}
		}
		
	};

	const [startsearchd, setStartsearchd] = useState('')
	const [endsearchd, setEndsearchd] = useState('')



	const [dete, setDete] = useState('');
	const [amte, setAmte] = useState(1.0);
	const [previousamte, setPreviousamte] = useState(0);
	const [catege, setCatege] = useState('Grocery');
	const [date, setDate] = useState('');
	const [ttypee, setTtypee] = useState('Credit');
	const [sno, setSno] = useState(0)

	const handleEditClick = (r) => {
		setDete(r.details);
		setAmte(r.amount);
		setCatege(r.dcategory);
		setDate(r.tdate);
		setTtypee(r.ttype);
		setSno(r.serialno);
		setPreviousamte(r.amount);
		setIsOpen(true);
	};


	const [isOpen, setIsOpen] = useState(false);
	const handleClosePopup = () => {
		setDete('')
		setAmte(1.0)
		setCatege('Grocery')
		setTtypee('Credit')
		setPreviousamte(1.0)
		setDate('')
		setIsOpen(false);  // Close the popup
	};

	const handleSave = (sno, d, a, c, dt, tt) => {

		const token = getCookie("token");
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
			fetch('http://localhost:8080/editrecord', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': getCookie("token")
				},
				body: JSON.stringify({
					"serialno": sno,
					"usename": getCookie("uname"),
					"details": d,
					"amount": a,
					"dcategory": c,
					"ttype": tt,
					"tdate": dt
				})
			}).then(response => {
				console.log(response.status);
				return response.text();
			}).then(data => {
				if (data === 'Successfully Edited Data') {
					alert("Transaction Edited Successfully");
					setUsepurpose('Data Edited')
				} else {
					alert("Data Not Saved try again")
				}
			}).catch(error => {
				console.error('Error:', error);
			})
			setDete('')
			setAmte(1.0)
			setCatege('Grocery')
			setTtypee('Credit')
			setDate('')
			setPreviousamte(1.0)
			setIsOpen(false);
			setUsepurpose('')
		}
	};
	const items = record.map(function (r, index) {
		if (r.ttype === 'Credit') {
			money += r.amount
		} else {
			money -= r.amount
			expense += r.amount
		}

		if (r.dcategory === 'Grocery' && r.ttype === 'Debit') {
			grocery += r.amount
		}

		if (r.dcategory === 'Food' && r.ttype === 'Debit') {
			food += r.amount
		}

		if (r.dcategory === 'Donation' && r.ttype === 'Debit') {
			donation += r.amount
		}

		if (r.dcategory === 'Bill Payment' && r.ttype === 'Debit') {
			bill += r.amount
		}

		if (r.dcategory === 'Investment' && r.ttype === 'Debit') {
			investment += r.amount
		}

		if (r.dcategory === 'Services' && r.ttype === 'Debit') {
			services += r.amount
		}

		if (r.dcategory === 'Healthcare' && r.ttype === 'Debit') {
			healthcare += r.amount
		}

		if (r.dcategory === 'Shopping' && r.ttype === 'Debit') {
			shopping += r.amount
		}

		if (r.dcategory === 'Fuel' && r.ttype === 'Debit') {
			fuel += r.amount
		}

		if (r.dcategory === 'Others' && r.ttype === 'Debit') {
			others += r.amount
		}
		if (money <= 0) {
			money *= -1;
		}
		return (
			<tr key={r.serialno}>
				<td>{index + 1}</td>
				<td>{r.details}</td>
				{r.ttype === 'Debit' ? (
					<td style={{ color: 'red', fontWeight: 'bold' }}>
						-{r.amount}
					</td>
				) : (
					<td style={{ color: 'green', fontWeight: 'bold' }}>
						+{r.amount}
					</td>
				)}
				<td>{r.dcategory}</td>
				<td>{r.tdate}</td>
				<td>
					<button className="eb" onClick={() => handleEditClick(r)}>Edit</button>
					<Popup
						open={isOpen}
						closeOnDocumentClick={false}
						modal
						nested
					>
						{(close) => (
							<div className="modal">
								<div className="content">
									<h2>Edit Transaction</h2>
									<div style={{ textAlign: 'center' }}>
										<div style={{ display: 'flex', justifyContent: 'center' }}>
											<label>Details</label>&nbsp;
											<textarea
												value={dete}
												rows={8} cols={20}
												onChange={(e) => {
													setDete(e.target.value)
												}}
											/>
										</div>
										<br />
										<br />
										<label>Amount</label>&nbsp;
										<input
											type="number"
											min="1"
											value={amte}
											onChange={(e) => {
												setAmte(e.target.value)
											}}
										/>
										<br />
										<br />
										<label>Category</label>&nbsp;
										<select
											value={catege}
											onChange={(e) => {
												setCatege(e.target.value)
											}}
										>
											{opt.map((val, index) => {
												return (
													<option key={index}>
														{val}
													</option>
												)
											})}
										</select>
										<br />
										<br />
										<label>Date</label> &nbsp;
										<input
											type="date"
											value={date}
											onChange={(e) => {
												setDate(e.target.value)
											}}
										/>
										<br />
										<br />
										<label>Trasaction Type</label>&nbsp;
										<select
											value={ttypee}
											onChange={(e) => {
												setTtypee(e.target.value)
											}}
										>
											<option value={'Credit'}>Credit</option>
											<option value={'Debit'}>Debit</option>
										</select>
										<br />
										<br />
									</div>
								</div>
								<div className="impbutton">
									<button onClick={handleClosePopup}>
										Cancel
									</button>
									&nbsp;&nbsp;&nbsp;
									<button
										onClick={() => {

											if (dete === '' || date === '') {
												alert("Please fill all the fields")
											} else if (amte < 1) {
												alert("Enter Amount greater than 0")
											} else if (ttypee === 'Credit') {
												const fm = ((money + expense) - previousamte)
												const finalres = (fm + parseFloat(amte)).toFixed(2)
												if (finalres < expense.toFixed(2)) {
													alert("Your Balance will be negative");
												}
												else {
													handleSave(sno, dete, amte, catege, date, ttypee);
												}
											} else if (ttypee === 'Debit') {
												const fm = ((expense - previousamte) + parseFloat(amte))
												console.log(fm)
												if (fm > (money + expense).toFixed(2)) {
													alert("Your Balance will be negative");
												}
												else {
													handleSave(sno, dete, amte, catege, date, ttypee);
												}
											}
										}}
									>
										SAVE
									</button>
								</div>
							</div>
						)}
					</Popup>&nbsp;&nbsp;

					{<button className="db" onClick={() => handleDelete(r.serialno, r.ttype,r.amount)}>Delete</button>}
				</td>
			</tr>
		)
	})

	grocery = (grocery / expense) * 100
	food = (food / expense) * 100
	donation = (donation / expense) * 100
	bill = (bill / expense) * 100
	investment = (investment / expense) * 100
	services = (services / expense) * 100
	healthcare = (healthcare / expense) * 100
	shopping = (shopping / expense) * 100
	fuel = (fuel / expense) * 100
	others = (others / expense) * 100

	const data = {
		labels: [
			'Grocery',
			'Food',
			'Donation',
			'Bill Payment',
			'Investment',
			'Services',
			'Healthcare',
			'Shopping',
			'Fuel',
			'Others'
		],
		datasets: [
			{
				label: [],
				data: [
					grocery.toFixed(2),
					food.toFixed(2),
					donation.toFixed(2),
					bill.toFixed(2),
					investment.toFixed(2),
					services.toFixed(2),
					healthcare.toFixed(2),
					shopping.toFixed(2),
					fuel.toFixed(2),
					others.toFixed(2)
				],
				backgroundColor: [
					'#f00a0a',
					'#f7992d',
					'#2df4f7',
					'#dc2df7',
					'#c2bc15',
					'#390af7',
					'#0af722',
					'#0ab0f7',
					'#a16a22',
					'#8f8c8c'
				],
				hoverOffset: 4,
				radius: 120
			}
		]
	}

	const [removebutton,setRemovebutton] = useState(false)

	const removefiltering = (e)=>{
		e.preventDefault()
		setStartsearchd('')
		setEndsearchd('')
		setUsepurpose('')
		setUsepurpose('reload original list')
		setRemovebutton(false)
	}

	const filtering = (e) => {
		e.preventDefault()
		if (startsearchd === '' || endsearchd === '') {
			alert('Select a Range of Date')
			setStartsearchd('')
			setEndsearchd('')
			setUsepurpose('Not entered Proper date')
			setRemovebutton(false)
		} else {
			const sd = new Date(startsearchd)
			const ed = new Date(endsearchd)
			if(sd > ed){
				alert("Enter a valid End Date")
				setStartsearchd('')
				setEndsearchd('')
				setUsepurpose('Invalid Date')
				setRemovebutton(false)
			}else{
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
					fetch('http://localhost:8080/filteringdata', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': getCookie("token")
						},
		
						body: JSON.stringify({
							"username" : getCookie("uname"),
							"sdate" : startsearchd,
							"edate" : endsearchd
						})
					}).then(response => {
						console.log(response.status);
						if (response.status === 200) {
							return response.json();							
						} else {
							throw new Error('Failed to fetch data');
						}
					}).then(data => {
						setRecord(data);
						setStartsearchd('')
						setEndsearchd('')	
						setRemovebutton(true)													
					}).catch(error => {
						console.error('Error:', error);
					});
		
				}
			}
			

		}

	}

	const opt = [
		'Grocery',
		'Food',
		'Donation',
		'Bill Payment',
		'Investment',
		'Services',
		'Healthcare',
		'Shopping',
		'Salary',
		'Gift',
		'Fuel',
		'Others'
	]
	return (
		<SplitPane split="horizontal" defaultSize={250}>
			<SplitPane split="vertical" defaultSize={500}>
				<div className="carddash">
					<div id="balp"> Your Current Balance</div>
					<div id="moneyp">₹ {globalmoney}</div>
					<div id="monetst">
						Goal Level: {displaygoal()}
						<div style={{ marginLeft: '5px', marginTop: '1px' }}>
							{displayicon()}
						</div>
					</div>
				</div>
				<div className="jschart" style={{ height: '100%' }}>
					{expense === 0 ? <div
						style={{
							textAlign: 'center',
							fontSize: '15px',
							color: 'grey'
						}}
					>
						<b>"No Expense to show"</b>
					</div> : (
						<Doughnut
							data={data}
							height="250"
							width="550"
							options={{
								aspectRatio: 2,
								responsive: false,

								plugins: {
									title: {
										display: true,
										position: 'left',
										text: 'Expense Chart (%)',
										font: {
											size: 20
										}
									}
								}
							}}
						/>
					)}
				</div>
			</SplitPane>

			<div
				style={{
					borderTop: '1px solid black',
					height: '240px',
					overflowY: 'scroll'
				}}
			>
				<div className="buttonadd">
					<div className="searchdiv">
						<form>
							<label>Start Date :</label>&nbsp;&nbsp;
							<input
								type="date"
								name="startd"
								value={startsearchd}
								onChange={(e) =>{
									setUsepurpose('start date selection')
									setStartsearchd(e.target.value)
								}
								}
							/>
							&nbsp;&nbsp;
							<label>End Date :</label>&nbsp;&nbsp;
							<input
								type="date"
								name="endd"
								value={endsearchd}
								onChange={(e) =>{
									setUsepurpose('end date selection')
									setEndsearchd(e.target.value)
								}
								}
							/>
							&nbsp;&nbsp;
							<button onClick={filtering}>Apply filter</button>&nbsp;&nbsp;&nbsp;
							{(removebutton)?<button onClick={removefiltering}>Remove filter</button>: null}
						</form>
					</div>

					<Popup
						trigger={
							<button className="button-73">
								Add Transaction
							</button>
						}
						closeOnDocumentClick={false}
						modal
						nested
					>
						{(close) => (
							<div className="modal">
								<div className="content">
									<h2>Add Transaction</h2>
									<div style={{ textAlign: 'center' }}>
										<div style={{ display: 'flex', justifyContent: 'center' }}>
											<label>Details</label>&nbsp;
											<textarea
												value={det}
												rows={8} cols={20}
												onChange={(e) => {
													setDet(e.target.value)
												}}
											/>
										</div>
										<br />
										<br />
										<label>Amount</label>&nbsp;
										<input
											type="number"
											min="1"
											value={amt}
											onChange={(e) => {
												setAmt(e.target.value)
											}}
										/>
										<br />
										<br />
										<label>Category</label>&nbsp;
										<select
											value={categ}
											onChange={(e) => {
												setCateg(e.target.value)
											}}
										>
											{opt.map((val, index) => {
												return (
													<option key={index}>
														{val}
													</option>
												)
											})}
										</select>
										<br />
										<br />
										<label>Date</label> &nbsp;
										<input
											type="date"
											value={dat}
											onChange={(e) => {
												setDat(e.target.value)
											}}
										/>
										<br />
										<br />
										<label>Trasaction Type</label>&nbsp;
										<select
											value={ttype}
											onChange={(e) => {
												setTtype(e.target.value)
											}}
										>
											<option value={'Credit'}>Credit</option>
											<option value={'Debit'}>Debit</option>
										</select>
										<br />
										<br />
									</div>
								</div>
								<div className="impbutton">
									<button onClick={() => {
										setDet('')
										setAmt(1)
										setCateg('Grocery')
										setTtype('Credit')
										setDat('')
										close()
									}}>
										Cancel
									</button>
									&nbsp;&nbsp;&nbsp;
									<button
										onClick={() => {
											if (det === '' || dat === '') {
												alert("Please fill all the fields")
											} else if (amt <= 0) {
												alert("Enter Amount greater than 0")
											} else if ((money.toFixed(2) === 0) && ttype === 'Debit') {
												alert("Your Balance is 0")
											} else if ((money.toFixed(2) - amt) < 0 && ttype === 'Debit') {
												console.log(money)
												console.log(amt)
												alert("Your Balance will be negative")
											} else {
												savetransaction(det, amt, categ, ttype, dat)
												close()
											}
										}}
									>
										SAVE
									</button>
								</div>
							</div>
						)}
					</Popup>
				</div>
				<h2 id="tmain">Transaction Statement</h2>
				{record.length === 0 ? (
					<div
						style={{
							textAlign: 'center',
							fontSize: '25px',
							color: 'grey'
						}}
					>
						<b>"Nothing to Show Here"</b>
					</div>
				) : (

					<table className="trantable">
						<thead>
							<tr>
								<th>S No</th>
								<th>Details</th>
								<th>Amount</th>
								<th>Category</th>
								<th>Date</th>
								<th> </th>
							</tr>
						</thead>
						<tbody>{items}</tbody>
					</table>
				)}
			</div>
		</SplitPane>
	)
}

export default Dashboard