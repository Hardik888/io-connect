import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './Screens/SignUp';
import LoginScreen from './Screens/Login';
import Home from './Screens/Home';
import { Appcontext } from './Context';

const App = () => {
  const [token, setToken] = useState('');

  const handleToken = (token:any) => {
    setToken(token);
  };

  const router = createBrowserRouter([
    {
      path: "/SignUp",
      element: <SignUp />
    },
    {
      path: "/Login",
      element: <LoginScreen ontoken={handleToken} />
    },
    {
      path: "/Home",
      element: token ? <Home /> : <LoginScreen ontoken={handleToken} /> // Render Home if token exists, otherwise render LoginScreen
    }
  ]);

  return (
    <Appcontext.Provider value={token}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Appcontext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
