import React from 'react';
import {Route, Redirect} from "react-router-dom";
import jwt_decode from 'jwt-decode';


const checkAuth = () => {
  const token = localStorage.getItem('usertoken');

  if (!token) {
    return false;
  }
     try {
      const { exp } = jwt_decode(token);
        if( exp < new Date().getTime() /1000) {
          return false;
        }
     }   catch (e) {

     }

  return true;
  }

const PrivateRoute = ({ component: Component, ...rest }) => {
    // debugger
    return (
    <Route {...rest} render={(props) => {
    // debugger    
    return    (
      checkAuth()
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login'}} />  
    )}} />
  )}

export default PrivateRoute;