import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Homepage from './Components/Homepage/homepage';
import Loginpage from './Components/Login/Loginpage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' exact component={Homepage}/>
        <Route path='/login' component={Loginpage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
