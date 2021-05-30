import React from "react";
import { IonGrid } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";
import { Table } from "../Table";

export const EnrolledUsers: React.FC<any> = () => {
  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const processedUsers: any = {};
  users.forEach((user: any) => { processedUsers[user._id] = user; });
  const processData = allEvents.map((event: any) => ({ ...event, user: processedUsers[event.userId] }));

  return (
    <IonGrid>
      <Table data={processData} headings={["Jersy No.", "Sport", "Sport Type", "Name", "URN", "Phone No.", "Gender", "Course", "Branch"]}>
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
          </tr>
        ))}
      </Table>
    </IonGrid>
  );
};
