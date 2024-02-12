import NavBar from '../Components/Navbar/NavBar';
import FitnessVideos from '../Components/Youtube/youtube';
import Sidebar from "../Components/Sidebar/SideBar";
import { useState } from 'react';
export default function Shortspg() {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    return(
        <>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <NavBar isOpen={isOpen}/>
        <FitnessVideos term="Sam Sulek" isOpen={isOpen}/>
        </>
    );
}