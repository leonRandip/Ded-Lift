import './/App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from '../src/Components/Login/login';
import Dash from './Dashboard/Dashboard';
import Planner from './MPlanner/Planner';
import ProgressPg from './IndiProgress/ProgressPg';
import StrengthPg from './StrengthPage/StrengthTester';
import ProfilePg from './ProfilePg/Profilepg';
import FeaturesPage from './Components/Features/features';
import Shortspg from './Shortspg/Shortspg';
import DashPage from './DashPage/DashPage';
function App() {


  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/dash" element={<Dash/>}/>
          <Route path="/meal" element={<Planner/>}/>
          <Route path='/progress' element={<ProgressPg/>}/>
          <Route path='/strength' element={<StrengthPg/>}/>
          <Route path='/features' element={<FeaturesPage/>}/>
          <Route path='/shorts' element={<Shortspg/>}/>
          <Route path='/dashpage' element={<DashPage/>}/>
          <Route path='/profile' element={<ProfilePg/>}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;