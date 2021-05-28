import React, { useEffect, useState } from "react";
import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLoading, IonMenuButton,
  IonRouterOutlet, IonTitle, IonToolbar, useIonRouter, useIonToast
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import { Route } from 'react-router-dom';
import Axios from "axios";
import { API } from "../constants";

export const AdminDashboard: React.FC<any> = ({ match = { url: "" } }) => {
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
    if (!auth?.user?.isAdmin) {
      router.push("/dashboard")
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
          <IonTitle>Admin Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='admin-dashboard'>
        <IonRouterOutlet>
          <Route path={`${match.url}/`} component={(props: any) => <div>/fd</div>} />
          <Route path={`${match.url}/admin/users`} component={(props: any) => <div>/admin/users</div>} />
          <Route path={`${match.url}/admin/events`} component={(props: any) => <div>/admin/events</div>} />
          <Route path={`${match.url}/admin/sports`} component={(props: any) => <div>/admin/sports</div>} />
          <Route path={`${match.url}/admin/mark-attendance`} component={(props: any) => <div>/admin/mark-attendance</div>} />
          <Route path={`${match.url}/admin/view-attendance`} component={(props: any) => <div>/admin/view-attendance</div>} />
          <Route path={`${match.url}/admin/mark-result`} component={(props: any) => <div>/admin/mark-result</div>} />
          <Route path={`${match.url}/admin/view-result`} component={(props: any) => <div>/admin/view-result</div>} />
        </IonRouterOutlet>
      </IonContent>
    </>
  );
};
