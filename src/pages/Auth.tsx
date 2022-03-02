import React, { useEffect, useState } from "react";
import { Login, Signup } from "../components/Auth";
import Axios from "axios";
import { IonCol, IonGrid, IonLoading, IonRow, useIonRouter, useIonToast } from "@ionic/react";
import { API, REGEX } from "../constants";
import { isEmpty } from "lodash";
import { useStoreActions, useStoreState } from 'easy-peasy';
import { PageLayout } from './Page';
import { SignupData } from "../interfaces";

export const Auth: React.FC<any> = ({ isLogin = false }) => {
  const router = useIonRouter();
  const [showToast] = useIonToast();
  const storeUserData = useStoreActions<any>((actions) => actions.storeUserData);
  const auth = useStoreState<any>(({ auth }) => auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(auth.token)) {
      router.push("/dashboard");
    }
  }, [])

  const signup = (userData: SignupData) => {
    const errors = validateData(userData);
    if (!isEmpty(errors)) {
      return errors;
    }
    setLoading(true);
    Axios.post(API.SIGNUP, userData)
      .then(result => {
        router.push("/login")
        showToast(`Please verify your email at ${userData.email}!`, 10000)
      })
      .catch(() => {
        showToast("Something went wrong", 3000)
      })
      .finally(() => {
        setLoading(false);
        return {};
      });
  };

  const login = (userData: object) => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateData = (userData: SignupData) => {
    const error: any = {};
    const { fullName, email, universityRoll, phoneNumber, password, course, branch, year, gender } = userData;
    if (!fullName) {
      error.fullName = "Please enter your name"
    }
    if (!REGEX.EMAIL.test(email)) {
      error.email = "Please use GNDEC college email"
    }
    if (!REGEX.UNIVERSITY_NO.test(universityRoll)) {
      error.universityRoll = "Please enter valid university rollnumber"
    }
    if (!REGEX.PHONE_NUMBER.test(phoneNumber)) {
      error.phoneNumber = "Please enter valid phone number"
    }
    if (!REGEX.PASSWORD.test(password)) {
      error.password = "Please enter valid password"
    }
    if (!course) {
      error.course = "Please select your course"
    }
    if (!branch) {
      error.branch = "Please select your branch"
    }
    if (!year) {
      console.log(year);
      error.year = "Choose your year"
    }
    if (!gender) {
      error.gender = "Please select your gender"
    }
    return error;
  }

  return (
    <PageLayout className="auth">
      <IonLoading
        isOpen={loading}
        message={'Hold on... Enjoy the wheater meanwhile!'}
      />
      <IonGrid className="form-grid">
        <IonRow className="form-container ion-align-items-center ion-justify-content-center">
          <IonCol>
            {isLogin ?
              (<Login onSubmit={login} loading={loading} />)
              : (<Signup onSubmit={signup} loading={loading} />)}
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageLayout>
  );
};
