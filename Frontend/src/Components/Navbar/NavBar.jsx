import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle } from 'react-bootstrap-icons';
import Logo from '../Assets/dead_lift.png';
import './nav.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

//shadow p-3 mb-5 bg-body rounded 
const NavBar = ({ isOpen, isAuthenticated, handleLogout }) => {
  const navigate=useNavigate();
  const location = useLocation();
  
  const reloadIfOnSamePage = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };

  
  
  
  return (
    <div className={`navbar ${isOpen ? 'shifted' : ''}`}>
   <Navbar
          expand="lg"
          className="custom-navbar rounded  p-3 mb-5"
          variant='light'
        >
           <Nav.Item className="font-bold-extra text-uppercase logo-text" onClick={reloadIfOnSamePage}> Ded-Lift</Nav.Item>
          <Navbar.Brand ><img onClick={reloadIfOnSamePage} src={Logo} className='Logo'></img>
         
          </Navbar.Brand>
          <Navbar.Toggle className='dedpool'  aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="me-auto">
              <Nav.Link href="/features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#memes">
                <NavDropdown
                  title={<PersonCircle size={20} />}
                  id="navbarScrollingDropdown"
                >
                  {isAuthenticated ? (
                    <>
                <NavDropdown.Item onClick={handleLogout} className='nav-link-transition'>Logout</NavDropdown.Item>
                <NavDropdown.Item className='nav-link-transition'>Profile</NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={() => navigate('/login')} className='nav-link-transition'>Login</NavDropdown.Item>
              )}
                  <NavDropdown.Item href="#action/3.2">
                    Payment Info
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                  
                  {/* <NavDropdown.Item href="#action/3.4">
                    Logout
                  </NavDropdown.Item> */}
                </NavDropdown>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      
    </div>
  );
}

export default NavBar;
