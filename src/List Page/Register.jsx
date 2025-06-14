import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../Redux/App/Slice/Slice';

const RegisterPage = () => {
  const dispatch = useDispatch();
 
  const navigate = useNavigate();

  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      first_name: firstRef.current.value,
      last_name: lastRef.current.value,
      email: emailRef.current.value,
      avatar: avatarRef.current.value
    };

    dispatch(createUser(newUser));
    alert('Form submitted!');
    navigate('/users');
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="create-user-modal-overlay">
      <div className="create-user-modal-content">
        <div className="modal-header">
          <h2>Create New User</h2>
          <button className="close-button" onClick={handleCancel}>
            <Link to="/users">&times;</Link>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name <span className="required">*</span></label>
            <input type="text" id="firstName" ref={firstRef} placeholder="Please enter first name" required />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name <span className="required">*</span></label>
            <input type="text" id="lastName" ref={lastRef} placeholder="Please enter last name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input type="email" id="email" ref={emailRef} placeholder="Please enter email" required />
          </div>

          <div className="form-group">
            <label htmlFor="profileImageLink">Profile Image Link <span className="required">*</span></label>
            <input type="url" id="profileImageLink" ref={avatarRef} placeholder="Please enter profile image link" required />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}><Link to="/users">Cancel</Link></button>
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
