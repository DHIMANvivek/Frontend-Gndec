/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IonButton, IonCol, IonGrid, IonRow, IonSelect, IonSelectOption, IonToggle, useIonToast } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { API, mapValue } from "../../constants";
import Axios from "axios";
import { Table } from "../Table";

export const AttendanceList: React.FC<any> = ({ view = false }) => {
  const [filterSport, setFilterSport] = useState('all');

  const [showToast] = useIonToast();
  const users = useStoreState<any>(({ users }) => users);
  const sports = useStoreState<any>(({ sports }) => sports);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const storeAllEvents = useStoreActions<any>(({ storeAllEvents }) => storeAllEvents);
  const [present, setPresent] = useState<string[]>([]);


  const objectifiedUsers: any = {};
  users.forEach((user: any) => { objectifiedUsers[user._id] = user; });

  const processEvents = allEvents
    .map((event: any) => ({ ...event, user: objectifiedUsers[event.userId] }))
    .filter((event: any) => filterSport === "all" || event.sportId._id === filterSport);

  useEffect(() => {
    setAlreadyPresent();
  }, [filterSport])

  const setAlreadyPresent = () => { // For initial render
    const presentEvents = processEvents
      .filter((event: any) => { return event.attendance === "present" })
      .map((event: any) => event._id)
    setPresent(presentEvents)
  }

  const markAttendance = () => {
    const absent = processEvents
      .filter((event: any) => !present.includes(event._id))
      .map((event: any) => event._id);
    Axios.post(API.MARK_ATTENDANCE, { present, absent })
      .then(() => {
        const updatedAllEvents: any = allEvents.map((event: any) => {
          if (present.includes(event._id)) {
            event.attendance = "present";
          } else if (absent.includes(event._id)) {
            event.attendance = "absent";
          }
          return event;
        });
        storeAllEvents(updatedAllEvents);
        showToast("Successfully marked attendance!", 3000);
      })
      .catch(() => {
        showToast("Something went wrong!", 3000);
      })
  }

  const selectPresent = (e: any, id: string) => {
    console.log(id)
    if (e.target.checked) {
      setPresent([...new Set([...present, id])])
    } else {
      setPresent(present.filter((a) => a !== id))
    }
  }

  return (
    <IonGrid>
      <Table
        data={processEvents}
        headings={["Jersy No.", "Sport", "Sport Type", "Name", "URN", "Phone No.", "Gender", "Course", "Branch", "Attendance"]}
        searchKeys={[
          "user.jerseyNo", "sportId.sportName", "sportId.sportType", "user.fullName", "user.universityRoll",
          "user.phoneNumber", "user.gender", "user.course", "user.branch", "attendance"
        ]}
        onQRScan={(rollNumber: string) => {
          setPresent([...new Set([...present, rollNumber])])
        }}
        filters={
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSelect
                  interface="popover"
                  value={filterSport}
                  onIonChange={(e) => setFilterSport(e.detail.value)}
                >
                  <IonSelectOption value="all">All</IonSelectOption>
                  {sports.map(({ _id, sportName }: any) => (<IonSelectOption key={_id} value={_id}>{sportName}</IonSelectOption>))}
                </IonSelect>
              </IonCol>
            </IonRow>
          </IonGrid>
        }
      >
        {(data: any) => data.map((event: any) => (
          <tr key={event._id}>
            <td>{event.user.jerseyNo}</td>
            <td>{event.sportId.sportName}</td>
            <td>{mapValue("SPORT_TYPE", event.sportId.sportType)}</td>
            <td>{event.user.fullName}</td>
            <td>{event.user.universityRoll}</td>
            <td>{event.user.phoneNumber}</td>
            <td>{mapValue("GENDER", event.user.gender)}</td>
            <td>{mapValue("COURSE", event.user.course)}</td>
            <td>{mapValue("BRANCH", event.user.branch)}</td>
            <td>
              {view
                ? mapValue("ATTENDANCE", event.attendance)
                : (<IonToggle checked={present.includes(event._id)} onClick={e => selectPresent(e, event._id)} />)}
            </td>
          </tr>
        ))}
      </Table>
      {!view && <IonButton expand="block" onClick={markAttendance} >Mark Attendance</IonButton>}
    </IonGrid>
  );
};
