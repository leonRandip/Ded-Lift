import React, { useEffect, useState } from 'react';
import './Appbar.css';
import { HouseDoorFill, EnvelopeFill, PersonFill, BoxArrowDownRight, DoorOpenFill } from 'react-bootstrap-icons';

import { useLocation, useNavigate } from 'react-router-dom';

const Appbar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();


  useEffect(() => {
    // Set activeItem based on location.pathname
    if (location.pathname === '/') {
      setActiveItem('1');
    } else if (location.pathname === '/dashpage') {
      setActiveItem('2');
    } else if (location.pathname === '/profile') {
      setActiveItem('3');
    } else if (location.pathname === '/login') {
      setActiveItem('4');
    }
    else{
      setActiveItem('2');
    }
  }, [location.pathname]);

  const handleItemClick = (path) => {
    // Check if the user is clicking on the active item
    if (location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="mobile-bottom-nav">
      <div
        className={`mobile-bottom-nav__item ${activeItem === '1' ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick('/')}
      >
        <div className="mobile-bottom-nav__item-content">
          <HouseDoorFill />
          <span>Home</span>
        </div>
      </div>
      <div
        className={`mobile-bottom-nav__item ${activeItem === '2' ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick('/dashpage')}
      >
        <div className="mobile-bottom-nav__item-content">
          <EnvelopeFill />
          <span>Pages</span>
        </div>
      </div>
      <div
        className={`mobile-bottom-nav__item ${activeItem === '3' ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick('/profile')}
      >
        <div className="mobile-bottom-nav__item-content">
          <PersonFill />
          <span>Profile</span>
        </div>
      </div>
      <div
        className={`mobile-bottom-nav__item ${activeItem === '4' ? 'mobile-bottom-nav__item--active' : ''}`}
        onClick={() => handleItemClick('/login')}
      >
        {!isAuthenticated ? (
          <div className="mobile-bottom-nav__item-content">
            <BoxArrowDownRight />
            <span>Login</span>
          </div>
        ) : (
          <div className="mobile-bottom-nav__item-content" onClick={handleLogout}>
            <DoorOpenFill />
            <span>Logout</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Appbar;
