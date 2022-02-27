import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonLoading,
  IonRow,
  useIonToast,
} from "@ionic/react";
import { API } from "../../constants";
import Axios from "axios";
import { EnrolledItem } from "../../common";
import { isEqual } from "lodash";

interface SportsData {
  _id: string,
  sportName: string,
  sportType: string,
  genderCategory: string,
  isActive: boolean,
}

export const SelectEvents: React.FC<any> = ({ fetchAll }) => {
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

  const enrollUserToEvents = async () => {
    try {
      const serverSports = await (await Axios.get(API.GET_SPORTS)).data;
      const serverUserEvents = await (await Axios.get(API.ME)).data.events;
      if (isEqual(serverSports, SPORTS) && isEqual(serverUserEvents, userEvents)) {
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
      } else {
        fetchAll();
        showToast("Server and local data sync error! Updating...", 3000)
      }
    } catch (error) {
      console.log(error)
      showToast("Something went wrong!", 3000)
    }
  }

  const putSelectedEvents = (value: string) => {
    if (!selectedEvents.includes(value)) {
      setSelectedEvents([...selectedEvents, value])
    } else {
      setSelectedEvents(selectedEvents.filter((node: string) => node !== value))
    }
  }

  return (
    <>
      <IonLoading
        isOpen={loading}
        message={'Hold on... Enjoy the wheater meanwhile!'}
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
                  onClick={() => putSelectedEvents(node._id)}
                  disabled={
                    ((disableOn || disableFieldOn2) && !selectedEvents.includes(node._id))
                    || savedEventsIds.includes(node._id)
                    || !node.isActive}
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
                  onClick={() => putSelectedEvents(node._id)}
                  disabled={
                    ((disableOn || disableTrackOn2) && !selectedEvents.includes(node._id))
                    || savedEventsIds.includes(node._id)
                    || !node.isActive}
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
            <IonCol>
              <EnrolledItem
                key={node._id}
                sportType={node.sportId.sportType}
                branch={auth?.user?.branch}
                sportName={node.sportId.sportName}
                genderCategory={node.sportId.genderCategory}
                position={node.position}
                attendance={node.attendance}
              />
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </>
  );
};
