import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './Components/Sidebar';
import IncomeChart from './Components/IncomeChart';
import HomePage from './pages/HomePage';
import IncomePage from './pages/IncomePage';
import ExpenseChart from './Components/ExpenseChart';
import ExpensePage from './pages/ExpensePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import { ThemeProvider } from './Components/apiContext';
import AuthForm from './Components/AuthForm';

function App() {
  return (


   <Router>
    <ThemeProvider>
    <Routes>
      
      <Route path='/dashboard' element={<HomePage/>}></Route>
      <Route path='/income' element={<IncomePage/>}></Route>
      <Route path='/expense' element={<ExpensePage/>}></Route>
      <Route path='/' element={<Login/>}></Route>

      {/* <Route path='/expense' element={<AuthForm/>}></Route> */}

      

  
    </Routes>
    </ThemeProvider>

   </Router>
  
  );
}

export default App;
