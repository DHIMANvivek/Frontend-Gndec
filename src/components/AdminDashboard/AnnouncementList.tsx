/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButton,
  IonInput,
  IonItemDivider,
} from "@ionic/react";
import { API } from "../../constants";
import { add } from "ionicons/icons";

export const AnnouncementList: React.FC<any> = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");

  useEffect(() => {
    Axios.get(API.GET_ANNOUNCEMENTS).then((res) => {
      setAnnouncements(res.data.allAnnouncements);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    console.log(announcementText);
  }, [announcementText]);

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setShowModal(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <IonContent>
        <IonModal isOpen={showModal} cssClass="my-custom-class">
          <IonList>
            <IonItemDivider>Announcement</IonItemDivider>
            <IonItem>
              <IonInput
                value={announcementText}
                placeholder="Enter Announcement"
                onIonChange={(e) => setAnnouncementText(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonFabButton onClick={() => setShowModal(true)}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonItem>
          </IonList>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
        <IonList>
          <IonItem>
            <IonLabel>Pokémon Yellow</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
};
