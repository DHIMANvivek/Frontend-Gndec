/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import {
  IonCol,
  IonGrid,
  IonRow,
  useIonAlert,
  useIonToast,
  IonLoading,
} from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Excel } from "../../common";

export const ExcelExport: React.FC<any> = ({ isPublic }) => {
  const modalRef = useRef<any>();
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();

  const storeAnnouncement = useStoreActions<any>((actions) => actions.storeAnnouncement);
  const announcements = useStoreState<any>(({ announcements }) => announcements);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementText, setAnnouncementText] = useState("");


  return (
    <>
      <IonLoading
        isOpen={loading}
        message={'Hold on... Enjoy the wheater meanwhile!'}
      />
      <IonGrid>
        <IonRow>
          <IonCol>
            <Excel></Excel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};
