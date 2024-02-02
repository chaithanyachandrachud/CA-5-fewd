import React, { useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router';
import axios from 'axios';

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    agreeToTerms: false
  });
  const [formError, setFormError] = useState('');

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const registered = () => {
    navigate("/");
  }

  const handleSubmit = event => {
    event.preventDefault();

    // Handle registration submission logic here
    if (formData.name.length < 3 || formData.name.length > 30) {
      setFormError('Name should be between 3 and 30 characters');
    } else if (!formData.email.includes('@')) {
      setFormError('Invalid email address');
    } else if (formData.password.length < 10 || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      setFormError('Password should be at least 10 characters long and contain at least one special character');
    } else if (formData.password !== formData.repeatPassword) {
      setFormError('Passwords do not match');
    } else if (!formData.agreeToTerms) {
      setFormError('Please agree to the terms and conditions');
    } else {
      registered()
      console.log('Registration form submitted:', formData);

      setFormData({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        agreeToTerms: false
      });
      setFormError('');
    }
  };

  return (
    <div className="container">
      <h1>CREATE ACCOUNT</h1>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Name:</label>
          <input type="text" name="name" placeholder='Your name' value={formData.name} onChange={handleChange} />
        </div>
        <div className="input">
          <label>Email:</label>
          <input type="email" name="email" placeholder='Your mail Id' value={formData.email} onChange={handleChange} />
        </div>
        <div className="input">
          <label>Password:</label>
          <input type="password" name="password" placeholder='Your Password' value={formData.password} onChange={handleChange} />
        </div>
        <div className="input">
          <label>Repeat Password:</label>
          <input type="password" name="repeatPassword" placeholder="Repeat Your Password" value={formData.repeatPassword} onChange={handleChange} />
        </div>
        <div className="input1">
          <label>
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />
            I agree to the terms and conditions
          </label>
        </div>
        <button onClick={!formData ? 'registered': ''} type="submit">Register</button>
        {formError && <p className="error-message">{formError}</p>}
      </form>
    </div>
  );
}

export default RegistrationForm;
