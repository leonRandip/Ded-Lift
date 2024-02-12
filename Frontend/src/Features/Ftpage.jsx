import { useState, useNavigate } from "react";
import Sidebar from "../Components/Sidebar/SideBar";
import NavBar from "../Components/Navbar/NavBar";
import Appbar from "../Components/Appbar /Appbar";
import FeaturesPage from "../Components/Features/features";
export default function Ftpage(){
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
    <NavBar isOpen={isOpen} isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
    <FeaturesPage isOpen={isOpen}/>
    <Appbar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
    </div>
        </>
    );
}