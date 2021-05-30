import React, { useEffect, useState } from "react";
import { IonButton, IonGrid, IonSelect, IonSelectOption, useIonToast } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { API, mapValue } from "../../constants";
import Axios from "axios";
import { Table } from "../Table";

export const ResultList: React.FC<any> = ({ view = false }) => {
  const [showToast] = useIonToast();
  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const storeAllEvents = useStoreActions<any>(({ storeAllEvents }) => storeAllEvents);
  const processedUsers: any = {};
  users.forEach((user: any) => { processedUsers[user._id] = user; });
  const processData = allEvents
    .map((event: any) => ({ ...event, user: processedUsers[event.userId] }))
    .filter((event: any) => event.attendance === "present")
    .filter((event: any) => {
      if (view) {
        return event.position > 0;
      }
      return event;
    });

  const [result, setResult] = useState<any>([]);

  useEffect(() => {
    setAlreadyResult();
  }, [])

  const selectResult = (node: any) => {
    setResult([...result.filter((n: any) => n._id !== node._id), node])
  }

  const setAlreadyResult = () => { // For initial render
    const presentEvents = processData
      .filter((event: any) => { return event.position > 0 })
      .map((event: any) => ({ _id: event._id, value: event.position }))
    setResult(presentEvents)
  }

  const markResult = () => {
    Axios.post(API.MARK_RESULT, { result })
      .then(() => {
        const updatedAllEvents: any = allEvents.map((event: any) => {
          const found = result.find((res: any) => res._id === event._id)
          if (found) {
            event.position = found.value;
          }
          return event;
        });
        storeAllEvents(updatedAllEvents);
        showToast("Successfully marked result!", 3000);
      })
      .catch(() => {
        showToast("Something went wrong!", 3000);
      })
  }

  return (
    <IonGrid>
      <Table
        data={processData}
        headings={["Jersy No.", "Sport", "Sport Type", "Name", "URN", "Phone No.", "Gender", "Course", "Branch", "Position"]}
        searchKeys={[
          "user.jerseyNo", "sportId.sportName", "sportId.sportType", "user.fullName",
          "user.universityRoll", "user.phoneNumber", "user.gender", "user.course", "user.branch", "event.position"
        ]}
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
              {view ? mapValue("RESULT", event.position) : (
                <IonSelect interface="popover"
                  onIonChange={e => selectResult({ _id: event._id, value: e.detail.value })}
                  value={(() => {
                    const found = result.find((node: any) => node._id === event._id);
                    if (!found) {
                      return 0;
                    }
                    return found.value;
                  })()}
                >
                  <IonSelectOption value={0}>None</IonSelectOption>
                  <IonSelectOption value={1}>First</IonSelectOption>
                  <IonSelectOption value={2}>Second</IonSelectOption>
                  <IonSelectOption value={3}>Third</IonSelectOption>
                </IonSelect>
              )}
            </td>
          </tr>
        ))}
      </Table>
      {!view && <IonButton expand="block" onClick={markResult} >Save Result</IonButton>}
    </IonGrid>
  );
};
