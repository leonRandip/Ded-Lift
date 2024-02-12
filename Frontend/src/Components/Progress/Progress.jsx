import React, { useEffect, useRef, useState } from 'react';
import './Progress.css';

import { Musclegrp } from './musclegrp';
import img1 from '../Assets/img.jpg';
import img2 from '../Assets/img1.jpg';
import img3 from '../Assets/img2.jpg';
import img4 from '../Assets/img3.jpg';


const Progress = ({isOpen}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [editedValues, setEditedValues] = useState({
    // other fields...
    additionalValue: '', // Add the new field for the hidden input
  });
  
  const [MusclegrpState, setMusclegrpState] = useState(Musclegrp);
  const containerRef = useRef(null);
  const popupContentRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(img1);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        popupContentRef.current &&
        !popupContentRef.current.contains(event.target) &&
        !containerRef.current.contains(event.target)
      ) {
        closePopup();
      }
    };

    if (isPopupVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isPopupVisible]);
  const openPopup = (name) => {
    const muscle = MusclegrpState.find((muscle) => muscle.name === name);
    setEditedValues({ ...muscle });
    setIsPopupVisible(true);
  };

  
  const updateImage = (value) => {
    // Replace this logic with your own conditions for changing images
    if (parseInt(value, 10) >2 && parseInt(value, 10) <=4) {
      setImageSrc(img2);
    } else if(parseInt(value, 10) >4 && parseInt(value, 10) <=7) {
      setImageSrc(img3);
    }
    else if(parseInt(value, 10) >=0 && parseInt(value, 10) <=2 || value.trim().length==0){
      setImageSrc(img1);
    }
    else if(parseInt(value, 10) >7){
      setImageSrc(img4);
    }
  };
  
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleDone = () => {
    const updatedMusclegrp = MusclegrpState.map((muscle) => {
      if (muscle.name === editedValues.name) {
        return { ...muscle, ...editedValues };
      }
      return muscle;
    });
  
    setMusclegrpState(updatedMusclegrp);
    closePopup();
  };

  const handleInputChange = (field, value) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <>
    <div className={`content ${isOpen ? 'shifted' : ''}`}>
      <div ref={containerRef} class="card-day5">
        {MusclegrpState.map((i, index) => (
          <div class="container69" key={index}>
            <article class="card69">
              <a class="card__link" href="#" onClick={() => openPopup(i.name)}>
              <div class="card__icon">
             <img src={i.musc}></img>

              </div>

              
              <div class="card__media">
              <img src={i.musc2}></img>

              </div>

              
              <div class="card__header">
                <p class="card__header-title">{i.name}</p>
                <p class="card__header-meta">Recent:{i.data}</p>
                <div class="card__header-icon">
                  <svg viewBox="0 0 28 25">
                    <path d="M13.145 2.13l1.94-1.867 12.178 12-12.178 12-1.94-1.867 8.931-8.8H.737V10.93h21.339z" fill="#fff"></path>
                  </svg>
                </div>
              </div>
              </a>
            </article>
          </div>
        ))}
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div ref={popupContentRef} className="popup-content">
            <h2 style={{color:"#fff"}}>Edit Values for {editedValues.name}</h2>
            <label>
              Data:
              <input type="text" name="text" class="inputtxt" value={editedValues.data || ''} onChange={(e) => handleInputChange('data', e.target.value)}></input>
            </label>
            <button class="cancel2" onClick={handleDone}>
            <svg xmlns="http://www.w3.org/2000/svg"   class="svgIcon" viewBox="0 0 16 16">
            <path fill="#fff" d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
            </svg>
          </button>
            <button class="cancel" onClick={closePopup}>
            <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
          </button>
          <details>
    <summary>Additional Values</summary>
    <label>
      Weiner size:
      <input
        type="text"
        name="additionalValue"
        className="inputtxt"
        placeholder='Inches'
        value={editedValues.additionalValue || ''}
        onChange={(e) => {
          handleInputChange('additionalValue', e.target.value);
          updateImage(e.target.value);
        }}
      ></input>
       <img src={imageSrc} alt="Additional Value Image"  style={{ width: "50px", height: "50px", marginLeft: "10px" }}/>
    </label>
  </details>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Progress;
