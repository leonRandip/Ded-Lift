import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/SideBar";
import NavBar from "../Components/Navbar/NavBar";
import Clock from "../Components/Content/Content";
import Chart from "../Components/Chart/Chart";
import './home.css';
import Appbar from "../Components/Appbar /Appbar";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
export default function Home(){
    const navigate=useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check authentication status when the component mounts
    // You can use your authentication state or token logic here
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);
  const handleLogout = () => {
    // Clear the token from the cookie
    Cookies.remove('token');
    
    // Update the authentication state
    setIsAuthenticated(false);
    
    // Redirect to the login page after logout
    navigate('/login');
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    return(
        <>
    <div className="Play">
    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    <div className="homecon">
    <NavBar isOpen={isOpen} isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
    
    <Clock isOpen={isOpen}/>
    <Chart isOpen={isOpen}/>
    <Appbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
    </div>
    </div>
        </>
    );
}