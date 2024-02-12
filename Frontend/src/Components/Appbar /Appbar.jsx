import React, { useState } from 'react';
import './Appbar.css';
import { HouseDoorFill, EnvelopeFill, PersonFill, BoxArrowDownRight, DoorOpenFill } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
const Appbar =({isAuthenticated, handleLogout})=> {
  const navigate=useNavigate();
  const [activeItem, setActiveItem] = useState(1);
  const location = useLocation();
  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  const reloadIfOnSamePage = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="mobile-bottom-nav">
      <div
        className={`mobile-bottom-nav__item ${activeItem === 1 ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick(1)}
      >
        <div className="mobile-bottom-nav__item-content" onClick={reloadIfOnSamePage}>
          <HouseDoorFill/>
          <span>Home</span>
        </div>
      </div>
      <div
        className={`mobile-bottom-nav__item ${activeItem === 2 ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick(2)}
      >
        <div className="mobile-bottom-nav__item-content">
          <EnvelopeFill />
          <span>two</span>
        </div>
      </div>
      <div
        className={`mobile-bottom-nav__item ${activeItem === 3 ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick(3)}
      >
        <div className="mobile-bottom-nav__item-content">
          <PersonFill/>
          <span>three</span>
        </div>
      </div>
      <div
        className={`mobile-bottom-nav__item ${activeItem === 4 ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick(4)}
      >
        {!isAuthenticated?(<div className="mobile-bottom-nav__item-content" onClick={()=>navigate('/login')}>
          <BoxArrowDownRight/>
          <span>Login</span>
        </div>):(
          <div className="mobile-bottom-nav__item-content" onClick={handleLogout}>
          <DoorOpenFill/>
          <span>Logout</span>
        </div>
        )}
      </div>
    </nav>
  );
}
export default Appbar;