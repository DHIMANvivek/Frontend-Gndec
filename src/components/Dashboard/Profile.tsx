import React from "react";
import {
  IonGrid,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import QRCode from "react-qr-code";
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
      <IonItem style={{ padding: "24px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", margin: "auto" }}>
          <h2 style={{ textAlign: 'center' }}>Chest Number QR</h2>
          <QRCode size={256} value={`${auth?.user?.jerseyNo}`} style={{ margin: "24px auto" }}></QRCode>
        </div>
      </IonItem>
    </IonGrid>
  );
};
