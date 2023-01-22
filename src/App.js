import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/user/state/userSlice';

import { Home } from './pages/Home/Home';
import { DemoHome } from './pages/Home/DemoHome';
import { Signin } from './pages/Auth/Signin';
import { Signup } from './pages/Auth/Signup';
import { Termsofservices } from './pages/termsofservices/Termsofservices';
import { ErrorMessage } from './pages/Error/ErrorMessage';

function App() {
	const user = useSelector(selectUser)

	return (
		<div className="App" id={user.theme}>
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup user={user}/>} />
					<Route path="/home/:targetPage" element={<Home />} />
					<Route path="/demo/:targetPage" element={<DemoHome />} />
					<Route path="/tos" element={<Termsofservices />} />
					<Route path="/error" element={<ErrorMessage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
