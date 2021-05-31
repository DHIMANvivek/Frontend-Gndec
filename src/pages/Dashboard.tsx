import React, { useEffect, useState } from "react";
import {
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  useIonRouter
} from "@ionic/react";
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import { Profile, SelectEvents } from "../components/Dashboard";
import Axios from "axios";
import { API } from "../constants";
import { PageLayout } from "./Page";

export const Dashboard: React.FC<any> = ({ match = { url: "" } }) => {
  const page = match.params.page;

  const storeUserData = useStoreActions<any>((actions) => actions.storeUserData);
  const storeUserEvents = useStoreActions<any>((actions) => actions.storeUserEvents);
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

  const me = (callback = () => { }) => {
    Axios.get(API.ME)
      .then(({ data }) => {
        storeUserData({ user: data.user });
        storeUserEvents(data.events);
      })
      .catch(() => {
        logOut()
      })
      .finally(() => {
        callback()
        setLoading(false)
      });
  }

  const doRefresh = (e: CustomEvent<any>) => {
    me(() => e.detail.complete());
  }

  return (
    <PageLayout>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
      />
      {page === undefined && <SelectEvents />}
      {page === 'profile' && <Profile />}
    </PageLayout>
  );
};

// eslint-disable-next-line no-lone-blocks
{/* <IonToolbar>
<IonButtons slot="start">
<IonBackButton defaultHref="/" />
</IonButtons>
<IonTitle>Back Button</IonTitle>
</IonToolbar> */}