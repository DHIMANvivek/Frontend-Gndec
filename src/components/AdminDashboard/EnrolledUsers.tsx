import React from "react";
import { IonGrid } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";

export const EnrolledUsers: React.FC<any> = () => {
  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const processedUsers: any = {};
  users.forEach((user: any) => { processedUsers[user._id] = user; });
  const processData = allEvents.map((event: any) => ({ ...event, user: processedUsers[event.userId] }));
  console.log(processData)
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
            </tr>
          ))}
        </tbody>
      </table>
    </IonGrid>
  );
};
