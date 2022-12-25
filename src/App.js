import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Homepage } from './Components/Homepage/Homepage';
import { Loginpage } from './Components/Login/Loginpage';
import { Navbar } from './Components/Navbar/Navbar';
import { Listspage } from './Components/Listspage/Listspage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Homepage/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/lists' element={<Listspage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
