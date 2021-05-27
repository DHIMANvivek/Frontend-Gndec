import React, { useEffect, useState } from "react";
import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLoading, IonMenuButton,
  IonRouterOutlet, IonTitle, IonToolbar, useIonRouter, useIonToast
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import { Profile, SelectEvents } from "../components/Dashboard";
import { Route } from 'react-router-dom';
import Axios from "axios";
import { API } from "../constants";

export const Dashboard: React.FC<any> = ({ match = { url: "" } }) => {
  const storeUserData = useStoreActions<any>((actions) => actions.storeUserData);
  const storeEvents = useStoreActions<any>((actions) => actions.storeEvents);
  const logout = useStoreActions<any>((actions) => actions.logOut);
  const auth = useStoreState<any>(({ auth }) => auth);
  const [loading, setLoading] = useState(true);

  Axios.defaults.headers.common.Authorization = auth.token;

  const isRehydrated = useStoreRehydrated();
  const router = useIonRouter();
  const [showToast] = useIonToast();

  useEffect(() => {
    if (!auth.token) {
      logOut()
    }
    else {
      me()
    }
  }, [isRehydrated])

  const logOut = () => {
    logout();
    router.push("/login")
  }

  const me = () => {
    Axios.get(API.ME)
      .then(({ data }) => {
        storeUserData({ user: data.user });
        storeEvents(data.events);
        setLoading(false)
      })
      .catch(() => {
        showToast("Something went wrong", 3000)
      });
  }

  return (
    <>
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
      />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={true} />
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton onClick={logOut}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='dashboard'>
        <IonRouterOutlet>
          <Route path={`${match.url}/`} component={(props: any) => <SelectEvents  {...props} />} />
          <Route path={`${match.url}/profile`} component={(props: any) => <Profile {...props} />} />
        </IonRouterOutlet>
      </IonContent>
    </>
  );
};

// eslint-disable-next-line no-lone-blocks
{/* <IonToolbar>
<IonButtons slot="start">
<IonBackButton defaultHref="/" />
</IonButtons>
<IonTitle>Back Button</IonTitle>
</IonToolbar> */}