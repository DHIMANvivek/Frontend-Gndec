import React, { useEffect } from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRouterOutlet, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { authUser } from '../utils/userToken';
import { isEmpty } from "lodash";
import { Profile, SelectEvents } from "../components/Dashboard";
import { Route, useLocation } from 'react-router-dom';

export const Dashboard: React.FC<any> = ({ match, userData }) => {
  const router = useIonRouter();
  const location = useLocation();
  useEffect(() => {
    console.log("Dashboard")
    const savedUser: any = authUser.getToken();
    if (isEmpty(savedUser) && location.pathname.includes('dashboard')) {
      console.log("Dashboard Red")
      logOut()
    }
  }, [])

  const logOut = () => {
    authUser.clearToken();
    router.push("/login")
  }

  return (
    <>
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
        {/* <IonContent> */}
        <IonRouterOutlet>
          <Route path={`${match.url}/`} component={(props: any) => <SelectEvents  {...props} userData={userData} />} />
          <Route path={`${match.url}/profile`} component={(props: any) => <Profile {...props} userData={userData} />} />
        </IonRouterOutlet>
        {/* </IonContent> */}
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