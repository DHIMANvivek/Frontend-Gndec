/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import {
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonCol,
  IonCard,
  IonRippleEffect,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonGrid,
  IonRow,
  IonFooter,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonTextarea,
} from "@ionic/react";
import { API } from "../../constants";
import { add, closeCircle, createOutline } from "ionicons/icons";

export const AnnouncementList: React.FC<any> = ({ isPublic }) => {
  const modalRef = useRef<any>();

  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementText, setAnnouncementText] = useState("");

  useEffect(() => {
    Axios.get(API.GET_ANNOUNCEMENTS).then((res) => {
      setAnnouncements(res.data.allAnnouncements);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      {!isPublic && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsOpen(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      )}
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonCard className="ion-activatable ripple-parent">
              <IonRippleEffect />
              <IonCardHeader>
                <IonItem color="transparent" lines="none">
                  <IonCardTitle>Time</IonCardTitle>
                  {!isPublic && (
                    <>
                      <IonIcon slot="end" color="primary" icon={createOutline} />
                      <IonIcon slot="end" color="danger" icon={closeCircle} />
                    </>
                  )}
                </IonItem>
              </IonCardHeader>
              <IonCardContent>
                <IonText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptas repellendus facere assumenda error accusantium, porro modi facilis illo magnam hic, fugit necessitatibus pariatur ratione laborum? Quaerat nostrum dignissimos eligendi.</IonText>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
      {!isPublic && (
        <IonModal ref={modalRef} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => modalRef.current.dismiss()}>
                  <IonIcon slot="icon-only" icon={closeCircle} />
                </IonButton>
              </IonButtons>
              <IonTitle>Announcement</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCol>
            <IonItem>
              <IonTextarea
                rows={15}
                placeholder="Add announcement details..."
                value={announcementText}
                onIonChange={(e) => setAnnouncementText(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
          </IonCol>
          <IonFooter>
            <IonButton expand="block" >Save Announcement</IonButton>
          </IonFooter>
        </IonModal>
      )}
    </>
  );
};
