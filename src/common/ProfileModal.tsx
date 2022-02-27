import React, { useRef } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import QRCode from "react-qr-code";
import { mapValue } from "../constants";
import { closeCircle } from "ionicons/icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import { EnrolledItem } from ".";

export const ProfileModal: React.FC<any> = () => {
  const modalRef = useRef<any>();

  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const modalProfileId = useStoreState<any>(({ modalProfileId }) => modalProfileId);

  const objectifiedUsers: any = {};
  users.forEach((user: any) => { objectifiedUsers[user._id] = user; });

  const foundUser = objectifiedUsers[modalProfileId];

  const profileData = [
    { title: 'Name', value: foundUser?.fullName },
    { title: 'Course', value: mapValue("COURSE", foundUser?.course) },
    { title: 'Branch', value: mapValue("BRANCH", foundUser?.branch) },
    { title: 'URN', value: foundUser?.universityRoll },
    { title: 'Email', value: foundUser?.email },
    { title: 'Gender', value: foundUser?.gender },
    { title: 'Jersey Number', value: foundUser?.jerseyNo },
    { title: 'Phone Number', value: foundUser?.phoneNumber }
  ];
  const userEvents = allEvents.filter((node: any) => (foundUser?._id === node?.userId));
  return (
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
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Personal Information</h1>
        <IonCol>
          {profileData.map(({ title, value }) => (
            <IonItem key={title}>
              <IonLabel>{title}</IonLabel>
              <IonNote slot="end">{value}</IonNote>
            </IonItem>
          ))}
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
  );
};
