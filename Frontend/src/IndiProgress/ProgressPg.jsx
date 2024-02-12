import { useState } from 'react';
import NavBar from '../Components/Navbar/NavBar';
import Progress from '../Components/Progress/Progress';
import Sidebar from '../Components/Sidebar/SideBar';
import './pg.css';
export default function ProgressPg() {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    return(
        <>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <NavBar isOpen={isOpen}/>
        <Progress isOpen={isOpen}/>
        </>
    );
}