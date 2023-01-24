// React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { selectUser } from './features/user/state/userSlice';

// CSS
import './App.css';

import { Home } from './pages/Home/Home';
import { DemoHome } from './pages/Home/DemoHome';
import { Signin } from './pages/Auth/Signin';
import { Signup } from './pages/Auth/Signup';
import { Termsofservices } from './pages/termsofservices/Termsofservices';
import { ErrorMessage } from './pages/Error/ErrorMessage';
import { Homepage } from './pages/Homepage/Homepage';
import { Process } from './pages/Process/Process'

// libs
import { ParallaxProvider} from 'react-scroll-parallax';

function App() {
	const user = useSelector(selectUser)

	return (
		<div className="App" id={user.theme}>
			<ParallaxProvider>
				<Router>
					<Routes>
						<Route path="/" exact element={<Homepage />} />
						<Route path="/process" element={<Process/>} />
						<Route path="/signin" element={<Signin />} />
						<Route path="/signup" element={<Signup user={user}/>} />
						<Route path="/home/:targetPage" element={<Home />} />
						<Route path="/demo/:targetPage" element={<DemoHome />} />
						<Route path="/tos" element={<Termsofservices />} />
						<Route path="/error" element={<ErrorMessage />} />
					</Routes>
				</Router>
			</ParallaxProvider>
		</div>
	);
}

export default App;
