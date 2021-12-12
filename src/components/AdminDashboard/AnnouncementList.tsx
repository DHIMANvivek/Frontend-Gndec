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
  useIonAlert,
} from "@ionic/react";
import { API } from "../../constants";
import { add, closeCircle, createOutline } from "ionicons/icons";

export const AnnouncementList: React.FC<any> = ({ isPublic }) => {
  const modalRef = useRef<any>();
  const [showAlert] = useIonAlert();

  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<any>([]);
  const [announcementText, setAnnouncementText] = useState("");

  const createAnnouncement = async () => {
    console.log(announcementText);
    const res = await Axios.post(`${API.CREATE_ANNOUNCEMENTS}`, {
      announcementText,
    });
    setAnnouncements([...announcements, res.data]);
    setIsOpen(false);
    fetchAnnouncements();
  };

  const updateAnnouncement = async (announcement: any) => {
    const response = await Axios.put(
      `${API.UPDATE_ANNOUNCEMENTS}`,
      announcement
    );
    console.log(response);
    setAnnouncements(response.data);
  };

  const hideAnnouncement = async (announcementId: any) => {
    const response = await Axios.put(
      `${API.DELETE_ANNOUNCEMENTS}`,
      announcementId
    );
    console.log(response);
    setAnnouncements(response.data);
  };

  const handleDelete = (announcementId: { _id: any }) => {
    showAlert("Remove from Team?", [
      { text: "Yes", handler: () => hideAnnouncement(announcementId) },
      { text: "No" },
    ]);
  };

  const fetchAnnouncements = async () => {
    Axios.get(API.GET_ANNOUNCEMENTS).then((res) => {
      setAnnouncements(res.data.allAnnouncements);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchAnnouncements();
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
            {announcements.map((announcement: any) => (
              <IonCard className="ion-activatable ripple-parent">
                <IonRippleEffect />
                <IonCardHeader>
                  <IonItem color="transparent" lines="none">
                    <IonCardTitle>Time</IonCardTitle>
                    {!isPublic && (
                      <>
                        <IonIcon
                          slot="end"
                          color="primary"
                          icon={createOutline}
                        />
                        <IonIcon
                          slot="end"
                          color="danger"
                          icon={closeCircle}
                          onClick={() => handleDelete(announcement._id)}
                        />
                      </>
                    )}
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonText>{announcement.announcementText}</IonText>
                </IonCardContent>
              </IonCard>
            ))}
          </IonCol>
        </IonRow>
      </IonGrid>
      {!isPublic && (
        <IonModal
          ref={modalRef}
          isOpen={isOpen}
          onDidDismiss={() => setIsOpen(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createAnnouncement();
            }}
          >
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
              <IonButton expand="block">Save Announcement</IonButton>
            </IonFooter>
          </form>
        </IonModal>
      )}
    </>
  );
};
