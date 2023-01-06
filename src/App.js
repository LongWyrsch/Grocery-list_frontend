import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Signin } from './pages/Auth/Signin';
import { Navbar } from './components/Navbar/Navbar';
import { Lists } from './pages/Lists/Lists';
import { Signup } from './pages/Auth/Signup';
import { Termsofservices } from './pages/termsofservices/Termsofservices';

function App() {
	return (
		<div className="App" id="lightmode">
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/lists" element={<Lists />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/tos" element={<Termsofservices />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
