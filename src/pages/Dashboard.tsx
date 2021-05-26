import React from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";

export const Dashboard: React.FC = () => {
  const location = useLocation();
  const [showToast] = useIonToast();

  return (
    <div className='dashboard'>
      <IonHeader>



        {/* <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Back Button</IonTitle>
        </IonToolbar> */}


        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={true} />
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>




      </IonHeader>
    </div>
  );
};
