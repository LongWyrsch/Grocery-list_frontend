import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/theme/state/themeSlice';

import { Home } from './pages/Home/Home';
import { Signin } from './pages/Auth/Signin';
import { Signup } from './pages/Auth/Signup';
import { Termsofservices } from './pages/termsofservices/Termsofservices';
import { Account } from './pages/Account/Account';

function App() {
  const theme = useSelector(selectTheme);

	return (
		<div className="App" id={theme}>
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/home/:targetPage" element={<Home />} />
					<Route path="/account" element={<Account />} />
					<Route path="/tos" element={<Termsofservices />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
