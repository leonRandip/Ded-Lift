import { useState } from "react";
import Sidebar from "../Components/Sidebar/SideBar";
import NavBar from "../Components/Navbar/NavBar";
import Day from "../Components/Day/Day";
export default function Dash(){
    
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    return(
        <>
    <div className="Play">
    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
    <NavBar isOpen={isOpen}/>
    <Day isOpen={isOpen}/>
    </div>
        </>
    );
}