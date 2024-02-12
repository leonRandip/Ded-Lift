import { CameraVideoFill } from 'react-bootstrap-icons';
import { EggFried, BandaidFill, CardList, AlarmFill } from 'react-bootstrap-icons';
import './PageDash.css';
const PageDash=(isOpen)=>{
    return(
        <>
        <div className={`content${isOpen ? 'shifted' : ''}`}>
            <div className="dash-contain">
            <div class="card-day-Dash">
            <div class="img"><CardList className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Dashboard</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash">
            <div class="img"><CameraVideoFill className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Shorts</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash">
            <div class="img"><EggFried className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Plan Meals</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash">
            <div class="img"><BandaidFill className='logo-dash'/></div>
            <div class="textBox">
                <div class="textContent">
                <p class="h1">Strength</p>
                </div>
                
            <div>
            </div></div></div>
            <div class="card-day-Dash">
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