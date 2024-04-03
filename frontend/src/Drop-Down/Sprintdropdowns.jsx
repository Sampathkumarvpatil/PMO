import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dropdowns.css';
import logo from './Images/Infogen-labs-logo-.png';

function Sprintdropdowns() {
  const [selectedOption, setSelectedOption] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const options = [
    'Sprint 1',
    'Sprint 2',
    'Sprint 3',
    'Sprint 4',
    'Sprint 5',
    // Add more options as needed
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setErrorMessage(''); // Clear the error message when a new option is selected
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setErrorMessage('Please select a sprint from the dropdown.');
      return;
    }
    // Navigate to the 'Sprints' route with the selected option as a parameter
    navigate(`/sprints/${selectedOption}`);
  };

  return (
    <div>
      <header className="sprint-header">
        <img src={logo} alt="Logo" className="sprint-logo" />
      </header>
      <div className="dropdown-container">
        <label className="dropdown-label">Sprint KPI's:</label>
        <select className="dropdown-select" value={selectedOption} onChange={handleChange}>
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="dropdown-label">Resources KPI's:</label>
        <select className="dropdown-select" value={selectedOption} onChange={handleChange}>
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {selectedOption && (
          <p className="selected-option">You selected: {selectedOption}</p>
        )}
      </div>
      <button className='submit-button' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Sprintdropdowns;
