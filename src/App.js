// React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser, selectUser, userWasRequested } from './features/user/state/userSlice';

// CSS
import './App.css';

import { Home } from './pages/Home/Home';
import { DemoHome } from './pages/Home/DemoHome';
import { Signin } from './pages/Auth/Signin';
import { Signup } from './pages/Auth/Signup';
// import { Termsofservices } from './pages/termsofservices/Termsofservices';
import { ErrorMessage } from './pages/Error/ErrorMessage';
import { Homepage } from './pages/Homepage/Homepage';
import { Process } from './pages/Process/Process'

// libs
import { ParallaxProvider} from 'react-scroll-parallax';
import { useEffect } from 'react';

function App() {	
	const dispatch = useDispatch();
	
	useEffect(() => {
		console.log('useEffect: dispatching getUser')

		// The user might try to access /signin. Let him try to fetch getUser(), if user has proper cookie, then below flow will redirect him to /home/lists.
		dispatch(getUser())
	}, [dispatch]);
	
	const user = useSelector(selectUser)
	
	// Wait for getUser() before deciding whether to render auth or home routes. Otherwise screen will flash signin page, then home page once user if fetched and authenticated.
	let userRequested = useSelector(userWasRequested)

	// Check if user is authenticated.
	let auth = (user.email!==null && user.email!=='demo.account@enjoy.com') || user.google_name!==null? true : false

	return (
		<div className="App" id={user.theme}>
			<ParallaxProvider>
				<Router>
					<Routes>
						<Route path="/" exact element={<Homepage user={user}/>} />
						<Route path="/process" element={<Process/>} />
						{userRequested? <Route path="/signin" element={!auth? <Signin/> : <Home />} /> : null}
						{userRequested? <Route path="/signup" element={!auth? <Signup user={user}/> : <Home />} /> : null}
						{userRequested? <Route path="/home/:targetPage" element={ auth? <Home /> : <Signin/> } /> : null}
						<Route path="/demo/:targetPage" element={<DemoHome />} />
						{/* <Route path="/tos" element={<Termsofservices />} /> */}
						<Route path="/error" element={<ErrorMessage />} />
					</Routes>
				</Router>
			</ParallaxProvider>
		</div>
	);
}

export default App;




