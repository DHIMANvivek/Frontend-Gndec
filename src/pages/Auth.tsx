import React, { useEffect, useState } from "react";
import { Login, Signup } from "../components/Auth";
import Axios from "axios";
import { IonCol, IonGrid, IonLoading, IonRow, useIonRouter, useIonToast } from "@ionic/react";
import { API } from "../constants";
import { isEmpty } from "lodash";
import { useStoreActions, useStoreState } from 'easy-peasy';
import { PageLayout } from './Page';

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

  const signup = (userData: object) => {
    setLoading(true);
    Axios.post(API.SIGNUP, userData)
      .then(result => router.push("/login"))
      .catch(() => {
        showToast("Something went wrong", 3000)
      })
      .finally(() => {
        setLoading(false);
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

  return (
    <PageLayout className="auth">
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
      />
      <IonGrid className="form-grid">
        <IonRow className="form-container ion-align-items-center ion-justify-content-center">
          <IonCol>
            {isLogin ? (<Login onSubmit={login} />) : (<Signup onSubmit={signup} />)}
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageLayout>
  );
};
