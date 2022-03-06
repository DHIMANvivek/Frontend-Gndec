/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  IonCol,
  IonGrid,
  IonRow,
  IonTitle,
  IonSelect,
  IonSelectOption,
  IonItem,
} from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Excel } from "../../common";
import { ATTENDANCE, COURSE, BRANCH, M_COMPUTER_APPLICATION, B_COMPUTER_APPLICATION, B_BUSINESS_ADMINISTRATION, M_BUSINESS_ADMINISTRATION, ARCHITECTURE } from "../../constants";

export const ExcelExport: React.FC<any> = () => {
  const [filterSport, setFilterSport] = useState('all');
  const [attendanceStatus, setAttendanceStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterBranch, setFilterBranch] = useState('all');

  useEffect(() => setFilterBranch("all"), [filterCourse])

  const getBranchCourse = (selectedCourse: any) => {
    switch (selectedCourse) {
      case 'b_tech':
      case 'm_tech':
        return BRANCH;
      case 'mca':
        return M_COMPUTER_APPLICATION;
      case 'bca':
        return B_COMPUTER_APPLICATION;
      case 'bba':
        return B_BUSINESS_ADMINISTRATION;
      case 'mba':
        return M_BUSINESS_ADMINISTRATION;
      case 'b_arch':
        return ARCHITECTURE;
      default:
        return [];
    }
  }


  const storeAnnouncement = useStoreActions<any>((actions) => actions.storeAnnouncement);
  const { allEvents, users, sports } = useStoreState<any>((state) => state);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementText, setAnnouncementText] = useState("");


  return (
    <IonGrid>

      <IonRow>
        <IonCol size="12">
          <IonTitle style={{ padding: 0 }}>Events List</IonTitle>
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonSelect
              interface="alert"
              style={{ width: "100%", maxWidth: "100%" }}
              value={filterSport}
              onIonChange={(e) => setFilterSport(e.detail.value)}
            >
              <IonSelectOption value="all">All Sports</IonSelectOption>
              {sports.map(({ _id, sportName }: any) => (<IonSelectOption key={_id} value={_id}>{sportName}</IonSelectOption>))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              interface="alert"
              style={{ width: "100%", maxWidth: "100%" }}
              value={attendanceStatus}
              onIonChange={(e) => setAttendanceStatus(e.detail.value)}
            >
              <IonSelectOption value="all">All Attendance</IonSelectOption>
              {ATTENDANCE.map(({ title, value }: any) => (<IonSelectOption key={value} value={value}>{title}</IonSelectOption>))}
            </IonSelect>
          </IonItem>
          <Excel />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12">
          <IonTitle style={{ padding: 0 }}>Department List</IonTitle>
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonSelect
              interface="alert"
              style={{ width: "100%", maxWidth: "100%" }}
              value={filterCourse}
              onIonChange={(e) => setFilterCourse(e.detail.value)}
            >
              <IonSelectOption value="all">All Courses</IonSelectOption>
              {COURSE.map(({ title, value }: any) => (<IonSelectOption key={value} value={value}>{title}</IonSelectOption>))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              interface="alert"
              style={{ width: "100%", maxWidth: "100%" }}
              value={filterBranch}
              onIonChange={(e) => setFilterBranch(e.detail.value)}
            >
              <IonSelectOption value="all">All Branches</IonSelectOption>
              {getBranchCourse(filterCourse).map(({ title, value }: any) => (<IonSelectOption key={value} value={value}>{title}</IonSelectOption>))}
            </IonSelect>
          </IonItem>
          <Excel />
        </IonCol>
      </IonRow>

    </IonGrid>
  );
};
