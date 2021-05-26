import React from "react";
import {
  IonGrid,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";

export const Profile: React.FC<any> = ({ userData }) => {
  const profileData = [
    { title: 'Name', value: userData.fullName },
    { title: 'Course', value: userData.course },
    { title: 'Branch', value: userData.branch },
    { title: 'URN', value: userData.universityRoll },
    { title: 'Email', value: userData.email },
    { title: 'Gender', value: userData.gender },
    { title: 'Jersey Number', value: userData.jerseyNo },
    { title: 'Phone Number', value: userData.phoneNumber }
  ]
  return (
    <IonGrid>
      {profileData.map(({ title, value }) => (
        <IonItem key={title}>
          <IonLabel>{title}</IonLabel>
          <IonNote slot="end">{value}</IonNote>
        </IonItem>
      ))}
    </IonGrid>
  );
};
