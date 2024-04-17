// LoginScreen.jsx
import React, { useState } from 'react';
import {useSocket} from '../socketSetup/socketConn';
import {fetchJwtToken }from '../Context';
import { useNavigate } from "react-router-dom";

import './loginStyles.css'; 
type LoginScreenProps = {
  onTokenChange: (token:string)=> void;
  onUserIdchange: (userId:string) => void;

}


// const LoginScreen = ({ontoken}:any,{onuserId}:any) => {
  const LoginScreen:React.FC<LoginScreenProps> =({onTokenChange,onUserIdchange})=>{
  const navigate = useNavigate();

    const {updateSocketId} = useSocket();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('');
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
      setErrorMessage('Username cannot be empty');
      return;
    }
    if (password.trim() === '') {
      setErrorMessage('Password cannot be empty');
      return;
    }
try {
    const response = await fetchJwtToken(username,password);
    if (response){
    // ontoken(response.token);
    // onuserId(response.userId);
      onTokenChange(response.token);
      onUserIdchange(response.userId);
      updateSocketId(response.userId);
      
      navigate('/Home');

    }
    }
  catch(error:any){
    console.log(error);
    setErrorMessage(error);
  }
  };
  

  return (
    <div className="main-container">
      <header>
        <h1 className="app-heading">.</h1>
      </header>

        <div className="app-container">
          <h2 style={{fontFamily:"fantasy"}}>Login</h2>
          <form>
            <div className="user-input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="user-input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="sendloginnow" onClick={handleSubmit}>Login</button>
          </form>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

  );
};

export default LoginScreen;
