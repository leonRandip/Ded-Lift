import React from 'react';
import { ImageAlt } from 'react-bootstrap-icons';
import './profile.css';
function Profile() {
  return (
    <>
        <div className="contain">
            <div className="cover-image">
                <div className="pic-contain">
                <div className="prof-img"></div>
                <div className="setpic">
                    <button className="button">
                    <ImageAlt className='bell'/>
                    </button>
                </div>
                </div>
                
            </div>
        </div>
    </>
  );
}

export default Profile;
{/* /* <div className="cover-image">
<div className="prof-img">
</div>
    <div className="setpic">
        <button class="button">
            <ImageAlt className='bell'/>
        </button>
    </div>
        <div class="card-day2"></div>  */ }