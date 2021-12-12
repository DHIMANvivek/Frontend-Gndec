import React, { useEffect, useState } from "react";
import {
  IonLoading, IonRefresher, IonRefresherContent, useIonRouter, useIonToast
} from "@ionic/react";
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import Axios from "axios";
import { API } from "../constants";
import { AttendanceList, EnrolledUsers, SportsList, UsersList, AnnouncementList } from "../components/AdminDashboard";
import { ResultList } from "../components/AdminDashboard/ResultList";
import { PageLayout } from "./Page";
import { ProfileModal } from "../common";

export const AdminDashboard: React.FC<any> = ({ match = { url: "" } }) => {
  const page = match.params.page;

  const storeUserData = useStoreActions<any>((actions) => actions.storeUserData);
  const storeAllEvents = useStoreActions<any>((actions) => actions.storeAllEvents);
  const storeSports = useStoreActions<any>((actions) => actions.storeSports);
  const storeUsers = useStoreActions<any>((actions) => actions.storeUsers);
  const modalProfileId = useStoreState<any>(({ modalProfileId }) => modalProfileId);
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
    fetchAll();
  }, [])

  const fetchAll = (callback = () => { }) => {
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
    Axios.get(API.GET_SPORTS)
      .then(result => storeSports(result.data))
      .catch(() => { }).finally(() => callback());
  }

  const doRefresh = (e: CustomEvent<any>) => {
    fetchAll(() => e.detail.complete());
  }

  const logOut = () => {
    logout();
    router.push("/login")
  }

  const me = () => {
    Axios.get(API.ME)
      .then(({ data }) => {
        storeUserData({ user: data.user });
      })
      .catch(() => {
        showToast("Something went wrong", 3000)
      }).finally(() => {
        setLoading(false);
      });
  }

  return (
    <PageLayout>
      {modalProfileId && <ProfileModal />}
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
      />
      {page === undefined && <UsersList />}
      {page === 'enrolled' && <EnrolledUsers />}
      {page === 'sports' && <SportsList />}
      {page === 'mark-attendance' && <AttendanceList />}
      {page === 'view-attendance' && <AttendanceList view={true} />}
      {page === 'mark-result' && <ResultList />}
      {page === 'view-result' && <ResultList view={true} />}
      {page === 'announcements' && <AnnouncementList />}
    </PageLayout>
  );
};
