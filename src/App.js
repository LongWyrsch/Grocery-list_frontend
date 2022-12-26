import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Homepage } from './Components/Homepage/Homepage';
import { Login } from './Components/Login/Login';
import { Navbar } from './Components/Navbar/Navbar';
import { Lists } from './Components/Lists/Lists';
import { LocalLogin } from './Components/LocalLogin/LocalLogin';
import { LocalRegister } from './Components/LocalRegister.js/LocalRegister';
import { Termsofservices } from './Components/Termsofservices/Termsofservices';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Homepage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/lists' element={<Lists/>}/>
          <Route path='/locallogin' element={<LocalLogin/>}/>
          <Route path='/localregister' element={<LocalRegister/>}/>
          <Route path='/tos' element={<Termsofservices/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
