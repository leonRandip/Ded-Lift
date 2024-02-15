import { CameraVideoFill } from 'react-bootstrap-icons';
import { EggFried, BandaidFill, CardList, AlarmFill } from 'react-bootstrap-icons';
import './PageDash.css';
import { useNavigate } from 'react-router-dom';
const PageDash=(isOpen)=>{
    const navigate=useNavigate();
    return(
        <>
        <div className={`content${isOpen ? 'shifted' : ''}`}>
            <div className="dash-contain">
            <div class="card-day-Dash" onClick={()=>navigate('/dash')}>
            <div class="img"><CardList className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Dashboard</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash" onClick={()=>navigate('/shorts')}>
            <div class="img"><CameraVideoFill className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Shorts</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash" onClick={()=>navigate('/meal')}>
            <div class="img"><EggFried className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Plan Meals</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash" onClick={()=>navigate('/strength')}> 
            <div class="img"><BandaidFill className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Strength</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash" style={{marginBottom:'40%'}} onClick={()=>navigate('/progress')}>
            <div class="img"><AlarmFill className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Progress</p>
                </div>
                
            <div>
            </div></div></div>
            </div>
            </div>
        </>
    );
}
export default PageDash;