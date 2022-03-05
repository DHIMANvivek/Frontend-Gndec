import React, { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import { pencil } from "ionicons/icons";
import QRCode from "react-qr-code";
import { mapValue, API } from "../constants";
import { closeCircle } from "ionicons/icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import { EnrolledItem } from ".";
import Axios from "axios";

export const ProfileModal: React.FC<any> = () => {
  const modalRef = useRef<any>();
  const [isUpdating, setIsUpdating] = useState<any>(false);
  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  const users = useStoreState<any>(({ users }) => users);
  const [loading, setLoading] = useState(false);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const modalProfileId = useStoreState<any>(({ modalProfileId }) => modalProfileId);

  const objectifiedUsers: any = {};
  users.forEach((user: any) => { objectifiedUsers[user._id] = user; });

  const foundUser = objectifiedUsers[modalProfileId];

  const profileData = [
    { title: 'Name', value: foundUser?.fullName },
    { title: 'Course', value: mapValue("COURSE", foundUser?.course) },
    { title: 'Branch', value: mapValue("BRANCH", foundUser?.branch) },
    { title: 'Year', value: mapValue("YEARS", foundUser?.year) },
    { title: 'URN', value: foundUser?.universityRoll },
    { title: 'Email', value: foundUser?.email },
    { title: 'Gender', value: foundUser?.gender },
    { title: 'Jersey Number', value: foundUser?.jerseyNo },
    { title: 'Phone Number', value: foundUser?.phoneNumber }
  ];

  const verifyUser = () => {
    setLoading(true);
    Axios.post(API.VERIFY_USER, { userId: foundUser?._id })
      .then(() => {
        updateModalProfileId(foundUser?._id);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };


  const userEvents = allEvents.filter((node: any) => (foundUser?._id === node?.userId));
  return (
    <>
      <IonLoading
        isOpen={loading}
        message={'Hold on... Enjoy the wheater meanwhile!'}
      />
      <IonModal ref={modalRef} isOpen onDidDismiss={() => updateModalProfileId("")}>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => modalRef.current.dismiss()}>
                  <IonIcon slot="icon-only" icon={closeCircle} />
                </IonButton>
              </IonButtons>
              <IonTitle>Profile</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ textAlign: "center", fontWeight: "bold", margin: "0" }}>Personal Information</h1>
            <IonFabButton size="small" color="danger" onClick={() => setIsUpdating(!isUpdating)}>
              <IonIcon icon={pencil}></IonIcon>
            </IonFabButton>
          </div>
          <IonCol>
            {profileData.map(({ title, value }) => (
              <IonItem key={title}>
                <IonLabel>{title}</IonLabel>
                <IonNote slot="end">{value}</IonNote>
              </IonItem>
            ))}
            <IonItem>
              <IonLabel>Verified</IonLabel>
              {!foundUser?.isVerified ? (
                <IonButton color="danger" size="small" onClick={verifyUser}>Verify Now!</IonButton>
              ) : (
                <IonNote slot="end">{foundUser?.isVerified ? 'Yes' : 'No'}</IonNote>
              )}
            </IonItem>
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Enrolled Events</h1>
            {userEvents.map((node: any) => (
              <EnrolledItem
                key={node._id}
                sportType={node.sportId.sportType}
                branch={foundUser?.branch}
                sportName={node.sportId.sportName}
                genderCategory={node.sportId.genderCategory}
                position={node.position}
                attendance={node.attendance}
                eventId={node._id}
              />
            ))}
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Jersy QR Code</h1>
            <IonItem style={{ padding: "24px 0" }}>
              <QRCode size={256} value={`${foundUser?.jerseyNo}`} style={{ margin: "24px auto" }}></QRCode>
            </IonItem>
          </IonCol>
        </IonContent>
      </IonModal>
    </>
  );
};
