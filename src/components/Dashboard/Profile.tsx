import React from "react";
import {
  IonGrid,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";

export const Profile: React.FC<any> = () => {
  const auth = useStoreState<any>(({ auth }) => auth);

  const profileData = [
    { title: 'Name', value: auth?.user?.fullName },
    { title: 'Course', value: mapValue("COURSE", auth?.user?.course) },
    { title: 'Branch', value: mapValue("BRANCH", auth?.user?.branch) },
    { title: 'URN', value: auth?.user?.universityRoll },
    { title: 'Email', value: auth?.user?.email },
    { title: 'Gender', value: auth?.user?.gender },
    { title: 'Jersey Number', value: auth?.user?.jerseyNo },
    { title: 'Phone Number', value: auth?.user?.phoneNumber }
  ];

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