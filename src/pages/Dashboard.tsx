import React, { useEffect, useState } from "react";
import {
  IonLoading,
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

  const me = () => {
    Axios.get(API.ME)
      .then(({ data }) => {
        storeUserData({ user: data.user });
        storeUserEvents(data.events);
        setLoading(false)
      })
      .catch(() => {
        logOut()
      });
  }

  return (
    <PageLayout>
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