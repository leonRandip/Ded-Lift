import React, { useState, useEffect } from 'react';
import './Content.css';
import { Link, useNavigate } from 'react-router-dom';
import VeganFoodSvg from '../Assets/vegan-food.svg';
import Muscleflex from '../Assets/muscle-flex.svg';
import arrRight from '../Assets/arrow-right.svg'
const Clock = ({ isOpen }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate=useNavigate();
  useEffect(() => {
    // Update the currentDateTime every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const day = currentDateTime.toLocaleDateString(undefined, { weekday: 'long' });
  const time = currentDateTime.toLocaleTimeString();
  return (
   <>
  <div className={`content ${isOpen ? 'shifted' : ''}`}>
          <div class="card-day" onClick={()=>navigate('/dash')}>
            <p class="time-text"><span>{time}</span><span class="time-sub-text"></span></p>
            <p class="day-text">{day}</p>
            <svg xmlns="http://www.w3.org/2000/svg"z width="1em" height="1em" viewBox="0 0 16 16" stroke-width="0" fill="currentColor" stroke="currentColor" class="moon"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path></svg>
        </div>
        <div class="card-day">
            <p class="time-text"><span>Meal Plan</span><span class="time-sub-text"></span></p>
              <a class="fancy3" onClick={()=>navigate('/meal')}>
              <span class="top-key"></span>
              <span class="text1">Create</span>
              <span class="bottom-key-1"></span>
              <span class="bottom-key-2"></span>
              </a>
              <Link to="https://culinarydelights.vercel.app/" className='moon' target='_blank'> <img src={VeganFoodSvg} alt="Vegan Food" className="vegan-food-svg " /></Link>
        </div>
        <div class="card-day">
            <p class="time-text2"><span>Muscle Progress</span><span class="time-sub-text"></span></p>
            <img src={Muscleflex} alt="bisex" className="muscle-big moon" />
            <img src={arrRight} alt="nosex" className="muscle-big moon2" onClick={()=>navigate('/progress')} />
        </div>
  </div>
   </>
);

};

export default Clock;
