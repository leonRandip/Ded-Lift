import { useEffect, useState } from 'react';
import './SideBar.css';
import {GearWideConnected} from 'react-bootstrap-icons'
import { Collection } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const Sidebar = ({ isOpen, toggleSidebar }) => {
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

   const closeSidebar = () => {
     toggleSidebar(); // Toggle the sidebar state in the parent component
   };
   const navigate=useNavigate();
const redirectToExternalSite = () => {
   window.open("https://powertoolsrental.vercel.app/", '_blank');
 };
  return (
    <div>
      <div className={`open-btn-container ${isOpen ? "hidden" : ""}`}>
        <button className="open-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button class="close-btn" onClick={closeSidebar}>
          <div class="button-box">
            <span class="button-elem">
              <svg
                className="align"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 46 40"
              >
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
            <span class="button-elem">
              <svg className="align" viewBox="0 0 46 40">
                <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
              </svg>
            </span>
          </div>
        </button>

        <div class="sidebar__content">
          <div class="sidebar__list">
            <button className="buttn" onClick={() => navigate("/")}>
              <span>Home</span>
            </button>

            <button className="buttn" onClick={() => navigate("/dash")}>
              <span>Dashboard</span>
            </button>

            <button className="buttn" onClick={() => navigate("/shorts")}>
              <span>Shorts</span>
            </button>

            <button className="buttn">
              <span>Subscription</span>
            </button>
          </div>

          <h1 class="sidebar__title">
            <span className="icon">
              <Collection />
            </span>
          </h1>

          <div class="sidebar__list">
            <button className="buttn" onClick={() => navigate("/meal")}>
              <span>Plan Meals</span>
            </button>

            <button className="buttn" onClick={() => navigate("/progress")}>
              <span>Progress</span>
            </button>

            <button className="buttn">
              <span>Playlist</span>
            </button>

            <button className="buttn" onClick={() => navigate("/strength")}>
              <span>Strength</span>
            </button>
          </div>

          <h1 class="sidebar__title">
            <span className="icon-set" onClick={redirectToExternalSite}>
              <GearWideConnected />
            </span>
          </h1>

          <div class="sidebar__list">
            <button className="buttn">
              <span>Notification</span>
            </button>

            <button className="buttn">
              <span>Settings</span>
            </button>
            {isAuthenticated ? (
              <>
                <button className="buttn" onClick={()=>navigate('/profile')}>
                  <span>Profile</span>
                </button>
                <button className="buttn" onClick={handleLogout}>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button className="buttn">
                  <span>Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Sidebar;
