import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  IonButton,
  IonCheckbox,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonNote,
  IonRow,
  useIonToast,
} from "@ionic/react";
import { trophyOutline } from "ionicons/icons";
import { API, ATTENDANCE_COLOR, mapValue } from "../../constants";
import Axios from "axios";

interface SportsData {
  _id: string,
  sportName: string,
  sportType: string,
  genderCategory: string,
}

export const SelectEvents: React.FC<any> = () => {
  const [showToast] = useIonToast();

  const SPORTS: SportsData[] = useStoreState<any>(({ sports }) => sports);
  const auth = useStoreState<any>(({ auth }) => auth);
  const userEvents = useStoreState<any>(({ userEvents }) => userEvents);
  const storeUserEvents = useStoreActions<any>((actions) => actions.storeUserEvents);

  const [selectedEvents, setSelectedEvents] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const allSelectedEvents: SportsData[] = selectedEvents
    .map((eve: string) => SPORTS.find((node) => (node._id === eve)));
  const fieldEventCount = allSelectedEvents.filter((event) => event?.sportType === "field").length;
  const trackEventCount = allSelectedEvents.filter((event) => event?.sportType === "track").length;

  const savedEventsIds = userEvents.map((node: any) => (node.sportId._id))
  const disableOn = (fieldEventCount === 2 && trackEventCount === 1) || (fieldEventCount === 1 && trackEventCount === 2)
  const disableFieldOn2 = fieldEventCount === 2;
  const disableTrackOn2 = trackEventCount === 2;

  useEffect(() => {
    setSelectedEvents(userEvents.map((event: any) => (event.sportId._id)))
  }, [SPORTS, userEvents])

  const enrollUserToEvents = () => {
    const newEnrollEvents: any = selectedEvents.filter((x: string) => !savedEventsIds.includes(x));
    if (!newEnrollEvents.length) {
      showToast("Please select atleast one event!", 3000);
      return;
    }
    setLoading(true)
    Axios.post(API.ENROLL_EVENTS, { sportIds: newEnrollEvents })
      .then(({ data }) => {
        storeUserEvents(data.events);
        showToast("Successfully enrolled the events!", 3000)
      })
      .catch(() => {
        showToast("Something went wrong", 3000)
      }).finally(() => {
        setLoading(false)
      });
  }

  const putSelectedEvents = (e: any) => {
    if (e.detail.checked) {
      setSelectedEvents([...selectedEvents, e.detail.value])
    } else {
      setSelectedEvents(selectedEvents.filter((node: string) => node !== e.detail.value))
    }
  }

  return (
    <>
      <IonLoading
        isOpen={loading}
        message={'Please wait...'}
      />
      <IonGrid>
        <h1>Select Events</h1>
        <p>Note:- You can select only 3 events atmost. It can be 2 field events and 1 track events or 1 field event and 2 track events</p>
        <h3>Field Events</h3>
        <IonRow>
          {SPORTS.filter(({ sportType, genderCategory }) => sportType === "field" && genderCategory === auth.user?.gender).map((node) => (
            <IonCol key={node._id}>
              <IonItem>
                <IonLabel>{node.sportName}: &nbsp;</IonLabel>
                <IonCheckbox
                  value={node._id}
                  checked={selectedEvents.includes(node._id)}
                  onIonChange={putSelectedEvents}
                  disabled={((disableOn || disableFieldOn2) && !selectedEvents.includes(node._id)) || savedEventsIds.includes(node._id)}
                />
              </IonItem>
            </IonCol>
          ))}
        </IonRow>
        <h3>Track Events</h3>
        <IonRow>
          {SPORTS.filter(({ sportType, genderCategory }) => sportType === "track" && genderCategory === auth.user?.gender).map((node) => (
            <IonCol key={node._id}>
              <IonItem lines="full">
                <IonLabel>{node.sportName}: &nbsp;</IonLabel>
                <IonCheckbox
                  value={node._id}
                  checked={selectedEvents.includes(node._id)}
                  onIonChange={putSelectedEvents}
                  disabled={((disableOn || disableTrackOn2) && !selectedEvents.includes(node._id)) || savedEventsIds.includes(node._id)}
                />
              </IonItem>
            </IonCol>
          ))}
        </IonRow>
        <IonButton expand="block" onClick={enrollUserToEvents} disabled={savedEventsIds.length >= 3}>Enroll</IonButton>
      </IonGrid>
      <IonGrid>
        <h1>Enrolled Events</h1>
        {userEvents.map((node: any) => (
          <IonRow key={node._id}>
            <IonCol >
              <IonItem>
                <IonLabel>
                  {(node.sportId.sportType === "relay" || node.sportId.sportType === "tugofwar") &&
                    <h2 color="primary">Team: {mapValue("BRANCH", auth?.user?.branch)}</h2>
                  }
                  <h2>{node.sportId.sportName}</h2>
                  <h3>{mapValue("SPORT_TYPE", node.sportId.sportType)}</h3>
                  <p>{node.sportId.genderCategory}</p>
                  {[...Array.from({ length: node.position }, (_, i) => i + 1)].map((node) => (
                    <IonIcon key={node} icon={trophyOutline}></IonIcon>
                  ))}
                </IonLabel>
                <IonNote slot="end">
                  <IonChip color={ATTENDANCE_COLOR[node.attendance]}>
                    <IonLabel>{mapValue("ATTENDANCE", node.attendance)}</IonLabel>
                  </IonChip>
                </IonNote>
              </IonItem>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </>
  );
};
