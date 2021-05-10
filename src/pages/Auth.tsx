import React, { useState } from "react";
import { Login, Signup } from "../components/Auth";
import { useLocation } from "react-router-dom";
import Axios from "axios";

export const Auth: React.FC = () => {
  const [location] = useState(useLocation());
  const signup = (userData: object) => {
    Axios.post("https://binary-meet.herokuapp.com/signup", {
      ...userData,
      jerseyNo: Math.random(),
    }).then(result => console.log(result));
  };

  const login = (userData: object) => {
    console.log(userData)
    Axios.post("https://binary-meet.herokuapp.com/login", {
      ...userData,
    }).then(result => console.log(result));
  };

  return (
    <div className='auth'>
      {location.pathname === "/login" ? (
        <Login onSubmit={login} />
      ) : (
        <Signup onSubmit={signup} />
      )}
    </div>
  );
};
