import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Registerpage } from './Registerpage';
import { Loginpage } from './Loginpage';
import { Forgotpassword } from './Forgotpassword';
import { Resetpassword } from './Resetpassword';


function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/resetpasswordfe' element={<Registerpage/>}/>
        <Route path='/resetpasswordfe/login' element={<Loginpage/>}/>
        <Route path='/resetpasswordfe/forgotpassword' element={<Forgotpassword/>}/>
        <Route path='/resetpasswordfe/resetpassword/:email/:token' element={<Resetpassword/>}/>
      </Routes>
    </div>
  );
}

export default App;


