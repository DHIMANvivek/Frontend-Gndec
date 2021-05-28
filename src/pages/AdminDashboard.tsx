import React, { useEffect, useState } from "react";
import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLoading, IonMenuButton,
  IonRouterOutlet, IonTitle, IonToolbar, useIonRouter, useIonToast
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import { Redirect, Route } from 'react-router-dom';
import Axios from "axios";
import { API } from "../constants";
import { AttendanceList, EnrolledUsers, SportsList, UsersList } from "../components/AdminDashboard";
import { ResultList } from "../components/AdminDashboard/ResultList";

export const AdminDashboard: React.FC<any> = ({ match = { url: "" } }) => {
  const storeUserData = useStoreActions<any>((actions) => actions.storeUserData);
  const storeUserEvents = useStoreActions<any>((actions) => actions.storeUserEvents);
  const storeAllEvents = useStoreActions<any>((actions) => actions.storeAllEvents);
  const storeUsers = useStoreActions<any>((actions) => actions.storeUsers);
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

  useEffect(() => {
    Axios.get(API.ALL_USERS)
      .then(({ data }) => {
        storeUsers(data.users);
      })
      .catch(() => {
        showToast("Something went wrong", 3000)
      });
    Axios.get(API.GET_ENROLLMENTS)
      .then(({ data }) => {
        storeAllEvents(data.allEvents);
      })
      .catch(() => {
        showToast("Something went wrong", 3000)
      });
  }, [])

  const logOut = () => {
    logout();
    router.push("/login")
  }

  const me = () => {
    Axios.get(API.ME)
      .then(({ data }) => {
        storeUserData({ user: data.user });
        storeUserEvents(data.events);
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
          <Route path={`${match.url}/`} exact component={(props: any) => <UsersList {...props} />} />
          <Route path={`${match.url}/enrolled`} component={(props: any) => <EnrolledUsers {...props} />} />
          <Route path={`${match.url}/sports`} component={(props: any) => <SportsList  {...props} />} />
          <Route path={`${match.url}/mark-attendance`} component={(props: any) => <AttendanceList />} />
          <Route path={`${match.url}/view-attendance`} component={(props: any) => <AttendanceList view={true} />} />
          <Route path={`${match.url}/mark-result`} component={(props: any) => <ResultList />} />
          <Route path={`${match.url}/view-result`} component={(props: any) => <ResultList view={true} />} />
          <Redirect to={`${match.url}`} />
        </IonRouterOutlet>
      </IonContent>
    </>
  );
};
