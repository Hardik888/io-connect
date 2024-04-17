import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Screens/SignUp';
import LoginScreen from './Screens/Login';
import Home from './Screens/Home';
import { Appcontext } from './Context';

const App = () => {
  const [token, setToken] = useState('');
  const [userId,setuserId] = useState('');
  

  
 
  const router = createBrowserRouter([
    {
      path: "/SignUp",
      element: <SignUp />
    },
    {
      path: "/Login",
      element: <LoginScreen  onTokenChange={setToken} onUserIdchange={setuserId}/>
    },
    {
      path: "/Home",
      
      element: token ? <Home /> : <LoginScreen onTokenChange={setToken} onUserIdchange={setuserId}/> // Render Home if token exists, otherwise render LoginScreen

    }
  
  ]);

  return (
      <Appcontext.Provider value={{token,userId}}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Appcontext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
