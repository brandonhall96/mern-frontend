// Imports
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
// CSS
import './App.css';
// Components
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';

//private route component


function App() {
  // Set state values
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(()=> {
      let token;
      //if there is no token inside localstorage, then user is not authenticated
      if (!localStorage.getItem('jwtToken')) {
          console.log('is not authenticated')
          setIsAuthenticated(false);
      } else {
          token = jwt_decode(localStorage.getItem('jwtToken'))
          console.log('token', token);
          setAuthToken(token);
          setCurrentUser(token)
      }
  }, []);

  const nowCurrentUser = userData => {
      console.log('inside now current user')
      setCurrentUser(userData)
      setIsAuthenticated(true);

  }

  const handleLogout = () => {
      //determine if there is a json web token jwt
      //if so we need to remove it
      //set current user to null
      //set is auth to false

      if (localStorage.getItem('jwtToken')) { //if there is a token
          localStorage.removeItem('jwtToken') //we removew it
          setCurrentUser(null) // and give it a value of null
          setIsAuthenticated(false) //set is auth to false 
      }
  }

  return (
    <div className="App">
      {/* <Navbar  /> */}
      
      <Footer />
    </div>
  );
}

export default App;
