import { useEffect, useState } from 'react';
import NavBar from '../Components/Navbar/NavBar';
import Progress from '../Components/Progress/Progress';
import Sidebar from '../Components/Sidebar/SideBar';
import Appbar from '../Components/Appbar /Appbar';
import './pg.css';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
export default function ProgressPg() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check authentication status when the component mounts
    // You can use your authentication state or token logic here
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);
  const handleLogout = () => {
    // Clear the token from the cookie
    Cookies.remove("token");

    // Update the authentication state
    setIsAuthenticated(false);

    // Redirect to the login page after logout
    navigate("/login");
  };
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    return (
      <>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <NavBar
          isOpen={isOpen}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
        <Progress isOpen={isOpen} />
        <Appbar
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        ></Appbar>
      </>
    );
}