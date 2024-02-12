import NavBar from '../Components/Navbar/NavBar';
import PowerliftingCalculator from '../Components/Strength Test/Strength';
import Sidebar from "../Components/Sidebar/SideBar";
import { useState } from 'react';
export default function StrengthPg() {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    return(
        <>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <NavBar isOpen={isOpen}/>
        <PowerliftingCalculator isOpen={isOpen}/>
        </>
    );
}