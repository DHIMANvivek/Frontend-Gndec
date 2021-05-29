import React, { useEffect, useState } from "react";
import { IonButton, IonGrid, IonToggle, useIonToast } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { API, mapValue } from "../../constants";
import Axios from "axios";

export const AttendanceList: React.FC<any> = ({ view = false }) => {
  const [showToast] = useIonToast();
  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const storeAllEvents = useStoreActions<any>(({ storeAllEvents }) => storeAllEvents);
  const processedUsers: any = {};
  users.forEach((user: any) => { processedUsers[user._id] = user; });
  const processEvents = allEvents
    .map((event: any) => ({ ...event, user: processedUsers[event.userId] }))
  // .filter((event: any) => !view && (event.attendance === "not_marked"));


  useEffect(() => {
    setAlreadyPresent();
  }, [])


  const [present, setPresent] = useState<string[]>([]);

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

  const setAlreadyPresent = () => { // For initial render
    const presentEvents = processEvents
      .filter((event: any) => { return event.attendance === "present" })
      .map((event: any) => event._id)
    setPresent(presentEvents)
  }

  const selectPresent = (id: string) => {
    if (present.includes(id)) {
      setPresent(present.filter((a) => a !== id))
    }
    else {
      setPresent([...present, id])
    }
  }

  return (
    <IonGrid>
      <table className="ionic-table">
        <thead>
          <tr>
            <th>Jersy No.</th>
            <th>Sport</th>
            <th>Sport Type</th>
            <th>Name</th>
            <th>URN</th>
            <th>Phone No.</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Branch</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {processEvents.map((event: any) => (
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
                  : (<IonToggle checked={present.includes(event._id)} onIonChange={e => selectPresent(event._id)} />)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!view && <IonButton expand="block" onClick={markAttendance} >Mark Attendance</IonButton>}
    </IonGrid>
  );
};
