import React, { useEffect } from "react";
import { Login, Signup } from "../components/Auth";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useIonRouter, useIonToast } from "@ionic/react";
import { API } from "../constants";
import { isEmpty } from "lodash";
import { useStoreActions, useStoreState } from 'easy-peasy';

export const Auth: React.FC<any> = () => {
  const location = useLocation();
  const router = useIonRouter();
  const [showToast] = useIonToast();
  const storeUserData = useStoreActions<any>((actions) => actions.storeUserData);
  const auth = useStoreState<any>(({ auth }) => auth);

  useEffect(() => {
    if (!isEmpty(auth.token)) {
      router.push("/dashboard");
    }
  }, [])

  const signup = (userData: object) => {
    Axios.post(API.SIGNUP, userData)
      .then(result => router.push("/login"))
      .catch(() => {
        showToast("Something went wrong", 3000)
      });
  };

  const login = (userData: object) => {
    Axios.post(API.LOGIN, userData)
      .then(({ data }) => {
        if (data.user.isVerified) {
          storeUserData({ user: data.user, token: data.token })
          if (data.user.isAdmin) {
            router.push("/admin");
          } else {
            router.push("/dashboard");
          }
        }
        else {
          showToast("Please verify your email", 3000)
        }
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
