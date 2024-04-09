import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import CreateUser from "../api/CreateUser";
export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() === '') {
      setErrorMessage('Username cannot be empty');
      return;
    }
    if (password.trim() === '') {
      setErrorMessage('Password cannot be empty');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    try {
const response = await CreateUser(username,password);
    if (response)
        console.log('User added successfully');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('Successfully added user');
      
    } catch (error) {
      console.error(error);
      setErrorMessage('Internal server error');
    }
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  return (
    <div className="main-container">
      <header>
        <h1 className="app-heading">.</h1>
      </header>
      <div className="app-container">
        <form >
          <div className="user-input">
            <label style={{ position: 'relative', marginLeft: '1vh', fontFamily: "fantasy" }}>Username</label>
            <input
              style={{ marginLeft: '1vh' }}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="user-input">
            <label style={{ position: 'relative', marginLeft: '2vh', fontFamily: "fantasy" }}>Password </label>
            <input
              style={{ marginLeft: '1vh' }}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label style={{ position: 'relative', marginLeft: '2vh', fontFamily: "fantasy" }}>Confirm Password </label>
            <input
              style={{ marginLeft: '1vh' }}
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="send" type="submit" onClick={handleSubmit}>Signup</button>
        </form>
        <button className="uselogin" onClick={handleLoginClick}>Login</button>
      </div>
      {errorMessage && <p className="error-code">{errorMessage}</p>}
    </div>
  );
};
