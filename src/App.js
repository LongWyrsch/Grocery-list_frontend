import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Navbar } from './components/navbar/Navbar';
import { Lists } from './pages/lists/Lists';
import { Register } from './pages/register/Register';
import { Termsofservices } from './pages/termsofservices/Termsofservices';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/lists' element={<Lists/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/tos' element={<Termsofservices/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
