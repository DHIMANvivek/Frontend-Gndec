import React from "react";
import { IonButton, IonGrid, IonToggle } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";

export const AttendanceList: React.FC<any> = ({ view = false }) => {
  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const processedUsers: any = {};
  users.forEach((user: any) => { processedUsers[user._id] = user; });
  const processData = allEvents
    .map((event: any) => ({ ...event, user: processedUsers[event.userId] }))
    .filter((event: any) => !view && (event.attendance === "not_marked"));

  const markAttendance = () => { }

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
          {processData.map((event: any) => (
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
                {view ? mapValue("ATTENDANCE", event.attendance) : (<IonToggle checked={true} onIonChange={e => console.log(e.detail.checked)} />)}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <IonButton expand="block" onClick={markAttendance} >Mark Attendance</IonButton>
    </IonGrid>
  );
};
