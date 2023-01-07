import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from './features/theme/state/themeSlice';

import { Home } from './pages/Home/Home';
import { Signin } from './pages/Auth/Signin';
import { Lists } from './pages/Lists/Lists';
import { Recipes } from './pages/Recipes/Recipes';
import { Signup } from './pages/Auth/Signup';
import { Termsofservices } from './pages/termsofservices/Termsofservices';

function App() {
  const theme = useSelector(selectTheme);

	return (
		<div className="App" id={theme}>
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/home/:targetPage" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/tos" element={<Termsofservices />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
