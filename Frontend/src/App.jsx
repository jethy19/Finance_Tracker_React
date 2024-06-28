import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import Error from './Error'
import Profile from './Profile'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="*" element={<Error />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	)
}
export default App