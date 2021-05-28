import React, { useEffect, useState } from "react";
import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLoading,
  IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar, useIonRouter
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import { Profile, SelectEvents } from "../components/Dashboard";
import { Redirect, Route } from 'react-router-dom';
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

  useEffect(() => {
    if (!auth.token && auth?.user?.isAdmin) {
      logOut()
    }
    else {
      me()
    }
    if (auth?.user?.isAdmin) {
      router.push("/admin")
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
        logOut()
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
          <Route path={`${match.url}/`} exact component={(props: any) => <SelectEvents  {...props} />} />
          <Route path={`${match.url}/profile`} component={(props: any) => <Profile {...props} />} />
          <Redirect to={`${match.url}`} />
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