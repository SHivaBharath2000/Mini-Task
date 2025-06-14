import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate=useNavigate()
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button 
          className="home-button"
          onClick={() => navigate('/login')}
        >
          Back to login
        </button>
      </div>
    </div>
  );
};

export default NotFound;
