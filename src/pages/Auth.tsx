import React, { useEffect } from "react";
import { Login, Signup } from "../components/Auth";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useIonRouter, useIonToast } from "@ionic/react";
import { API } from "../constants";
import { authUser } from "../utils/userToken";
import { isEmpty } from "lodash";

export const Auth: React.FC = () => {
  const location = useLocation();
  const router = useIonRouter();
  const [showToast] = useIonToast();

  useEffect(() => {
    const savedUser: any = authUser.getToken();
    console.log("Auth")
    if (!isEmpty(savedUser)) {
      console.log("Auth Red")
      router.push("/dashboard");
    }
  }, [])

  const signup = (userData: object) => {
    Axios.post(API.SIGNUP, {
      ...userData,
      jerseyNo: Math.random(),
    })
      .then(result => router.push("/login"))
      .catch(() => {
        showToast("Something went wrong", 3000)
      });
  };

  const login = (userData: object) => {
    Axios.post(API.LOGIN, {
      ...userData,
    })
      .then(({ data }) => {
        authUser.setToken(data.token);
        router.push("/dashboard");
      })
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
