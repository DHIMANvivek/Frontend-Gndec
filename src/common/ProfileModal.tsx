import React, { useRef } from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { mapValue } from "../constants";
import { closeCircle } from "ionicons/icons";
import { useStoreActions, useStoreState } from "easy-peasy";

export const ProfileModal: React.FC<any> = () => {
  const modalRef = useRef<any>();

  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  const users = useStoreState<any>(({ users }) => users);
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

  return (
    <IonModal ref={modalRef} isOpen onDidDismiss={() => updateModalProfileId("")}>
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
      <IonCol>
        {profileData.map(({ title, value }) => (
          <IonItem key={title}>
            <IonLabel>{title}</IonLabel>
            <IonNote slot="end">{value}</IonNote>
          </IonItem>
        ))}
      </IonCol>
    </IonModal>
  );
};
