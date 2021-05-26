import React from "react";
import { Login, Signup } from "../components/Auth";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useIonToast } from "@ionic/react";

export const Auth: React.FC = () => {
  const location = useLocation();
  const [showToast] = useIonToast();

  const signup = (userData: object) => {
    Axios.post("http://localhost:1414/signup", {
      ...userData,
      jerseyNo: Math.random(),
    })
      .then(result => console.log(result))
      .catch(() => {
        showToast("Something went wrong", 3000)
      });
  };

  const login = (userData: object) => {
    Axios.post("http://localhost:1414/signin", {
      ...userData,
    })
      .then(result => console.log(result))
      .catch(() => {
        showToast("Something went wrong", 3000)
      });
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
