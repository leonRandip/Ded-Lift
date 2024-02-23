import React, { useState } from 'react';
import './strength.css';
import jsPDF from 'jspdf'; 
import signatureImage from '../Assets/signature.png';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import certiLogo from '../Assets/CertiLogo.jpeg';

const PowerliftingCalculator = ({ isOpen }) => {
  const wilksCalculator = require('wilks-calculator');
  const [unit, setUnit] = useState('lbs');
  const [gender, setGender] = useState('m'); // Default to male
  const [benchPress, setBenchPress] = useState(0);
  const [squat, setSquat] = useState(0);
  const [deadlift, setDeadlift] = useState(0);
  const [bodyWeight, setBodyWeight] = useState(0);
  const [wilksScore, setWilksScore] = useState(null);
  const [category, setCategory] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const calculateWilksScore = () => {
    const totalWeight = parseFloat(benchPress) + parseFloat(squat) + parseFloat(deadlift);
    const bodyWeightValue = parseFloat(bodyWeight);
  
    if (isNaN(totalWeight) || isNaN(bodyWeightValue) || bodyWeightValue <= 0) {
      // Handle invalid input
      console.error('Invalid input. Please enter valid numbers.');
      return;
    }
  
    let score = 0;
  
    if (gender === 'm' && unit === 'kg') {
      score = wilksCalculator.calculateWilksScore('m', bodyWeightValue, totalWeight);
    } else if (gender === 'm' && unit === 'lbs') {
      score = wilksCalculator.calculateWilksScore('m', bodyWeightValue, totalWeight, 'imperial');
    } else if (gender === 'f' && unit === 'kg') {
      score = wilksCalculator.calculateWilksScore('f', bodyWeightValue, totalWeight);
    } else if (gender === 'f' && unit === 'lbs') {
      score = wilksCalculator.calculateWilksScore('f', bodyWeightValue, totalWeight, 'imperial');
    }
  
    categorizeWilksScore(score);
    setWilksScore(score);
  };
  

  const categorizeWilksScore = (score) => {
    if (score >= 450) {
      setCategory('Elite');
    } else if (score >= 375) {
      setCategory('Advanced');
    } else if (score >= 300) {
      setCategory('Intermediate');
    } else if (score >= 225) {
      setCategory('Novice');
    } else {
      setCategory('Beginner');
    }

    // Calculate star rating
    const normalizedScore = Math.min(score / 500, 1);
    const stars = Math.ceil(normalizedScore * 5);
    setStarRating(stars);
  };

  const generatePDF = () => {
    // Create a new jsPDF instance with Letter size (8.5 × 11 inches)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });
  
    // Add a border and title to make it look like a certificate
    doc.rect(0.5, 0.5, 7.5, 10.5); // Border (adjust dimensions accordingly)
    doc.setFontSize(14);
    doc.setTextColor(255, 0, 0);
    doc.text('Certificate of Achievement', 1, 1);
    doc.text('______________________', 1, 1.2);
    doc.addImage(certiLogo, 'JPG', 6, 0.5, 2, 2);
  
    // Add content to the PDF
    doc.setFontSize(10);
    doc.setTextColor("black");
    doc.text(`1. Wilks Score: ${wilksScore.toFixed(2)}`, 1, 3);
    doc.text(`2. Category: ${category}`, 1, 3.5);
    doc.text(`3. Star Rating: ${starRating} / 5`, 1, 4);
  
    doc.addImage(signatureImage, 'PNG', 6, 5, 2, 1);
  
    // Add a signature line
    doc.setTextColor("red");
    doc.text('Signature', 6.5, 6.5);
  
    // Save the PDF file
    doc.save('Certificate.pdf');
  };
  const handleData = () => {
    const totalWeight = parseFloat(benchPress) + parseFloat(squat) + parseFloat(deadlift);
    const requestData = {
      bodyWeight: parseFloat(bodyWeight),
      totalWeight: totalWeight,
      wilksScore: wilksScore, // Ensure that wilksScore is included in the request body
    };
  
    axios
      .post("https://ded-lift.onrender.com/wilks", requestData)
      .then((res) => {
        console.log(res.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick=()=>{
    handleData();
    handleShow();
  }
  return (
    <div className={`content ${isOpen ? 'shifted' : ''}`}>
      <div className='contain54'>
        <h1>Wilks Score Calculator</h1>
        <div>
          <label>
            Bench Press (in {unit}):
            <input type="number" value={benchPress} onChange={(e) => setBenchPress(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Squat (in {unit}):
            <input type="number" value={squat} onChange={(e) => setSquat(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Deadlift (in {unit}):
            <input type="number" value={deadlift} onChange={(e) => setDeadlift(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Bodyweight (in {unit}):
            <input type="number" value={bodyWeight} onChange={(e) => setBodyWeight(e.target.value)} />
        </label>
        </div>
        <div>
          <label>
            Select Unit:
            <select className='dropdown2' value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="lbs">Pounds</option>
              <option value="kg">Kilograms</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Select Gender:
            <select className='dropdown2' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </label>
        </div>
        <button className="scorebutton" onClick={calculateWilksScore}>Calculate Wilks Score</button>
        {wilksScore !== null && (
          <div className='result'>
            <p>Wilks Score: {wilksScore.toFixed(2)}</p>
            <p>Category: {category}</p>
            <p>Star Rating: {starRating} / 5</p>
            <div className="star-container">
            {[...Array(5)].map((_, index) => (
            <div
          key={index}
          className={`five-pointed-star ${index < starRating ? 'glowing' : ''}`}
            ></div>
      ))}
    </div>
      <button className='scorebutton' style={{marginRight:"10px"}} onClick={handleClick}>
        Upload
      </button>
      <Modal contentClassName='custom-modal' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="custom-title">Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Content Updated Successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    <button className="scorebutton" onClick={generatePDF}>Download PDF</button>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default PowerliftingCalculator;
