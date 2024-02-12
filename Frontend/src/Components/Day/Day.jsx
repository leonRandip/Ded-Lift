import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './Day.css';
import image from '../Assets/IMG_6474.JPG'
import image1 from '../Assets/jebu.jpeg'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { ExclamationCircle } from 'react-bootstrap-icons';
import { FileEarmarkImageFill } from 'react-bootstrap-icons';
import gif from '../Assets/work.gif';
import {useNavigate } from 'react-router-dom';

const Day =({isOpen})=>{
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Results may vary.
        </Tooltip>
      );
      const navigate=useNavigate();
    return(
    <div className={`content ${isOpen ? 'shifted' : ''}`}>
        <div className="comcont">
        <div className="f-layout">
        <div className="g-layout">
        <div class="card-day1">
            <p class="time-text"><span>Chest</span><span class="time-sub-text"></span></p>
              <a class="fancy1" href="#">
              <span class="top-key"></span>
              <span class="label"></span>
              <span class="bottom-key-1"></span>
              <span class="bottom-key-2"></span>
              </a>
            </div>
            <div class="card-day1">
            <p class="time-text"><span>Triceps</span><span class="time-sub-text"></span></p>
              <a class="fancy1" href="#">
              <span class="top-key"></span>
              <span class="label"></span>
              <span class="bottom-key-1"></span>
              <span class="bottom-key-2"></span>
              </a>
            </div>
        </div>
        <div class="card-day2">
          <div className="textainer">
          <div>
          <p class="time-text"><span>Strength Test</span><span class="time-sub-text"><OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}><ExclamationCircle></ExclamationCircle></OverlayTrigger></span></p>
          </div>
        <div>
        <a class="fancy1" onClick={()=>navigate('/strength')} href="#">
              <span class="top-key"></span>
              <span class="label2"></span>
              <span class="bottom-key-1"></span>
              <span class="bottom-key-2"></span>
              </a>
          </div>
          </div>
          
            <div className="giftainer">
              <img  className='giftain' src={gif} alt="" />
              <hr className='new-'/>
              </div>
            </div>
      </div>
             <div class="card-day3">
            <p class="time-text"><span>Progress Updates</span><span class="time-sub-text"></span></p>
            <div className="pcontain">
            <div id="myDiv">
              <Container>
              <Row>
                <Col xs={2} md={2}>
                  <Image src={image} thumbnail />
                </Col>
                <Col xs={2} md={2}>
                  <Image src={image1} thumbnail />
                </Col>
                <Col xs={2} md={3}>
                <div className="photo">
                <label for="file" class="custum-file-upload">
                <div class="icon2">
                <svg viewBox="0 0 24 24" fill="" width="50px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                </div>
                <div class="text1">
                  <span>Click to upload image</span>
                  </div>
                  <input id="file" type="file"/>
                </label>
                </div>
                </Col>
              </Row>
              <button class="Btn_view log">
  
            <div class="sign"><FileEarmarkImageFill/> </div>
  
            <div class="text">View All</div>
            </button>
            </Container>
            </div>
            </div>
            
            </div> 
        </div>
        
    </div>
        
    );
};
export default Day;