/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRippleEffect, IonRow, IonSelect, IonSelectOption, IonText, IonToggle, useIonToast } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { API, GENDER, mapValue, mergeSearch } from "../../constants";
import Axios from "axios";
import { americanFootball, callSharp, megaphone, qrCodeOutline } from "ionicons/icons";
import { GenderIcon } from "../../common";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

export const AttendanceList: React.FC<any> = ({ view = false }) => {
  const [filterSport, setFilterSport] = useState('none');

  const [showToast] = useIonToast();
  const users = useStoreState<any>(({ users }) => users);
  const sports = useStoreState<any>(({ sports }) => sports);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const storeAllEvents = useStoreActions<any>(({ storeAllEvents }) => storeAllEvents);
  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  const [present, setPresent] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const objectifiedUsers: any = {};
  users.forEach((user: any) => { objectifiedUsers[user._id] = user; });

  const processEvents = allEvents
    .map((event: any) => ({ ...event, user: objectifiedUsers[event.userId] }))
    .filter((event: any) => event.sportId._id === filterSport);

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

  const onQRScan = (rollNumber: string) => {
    if (processEvents.length) {
      const event = processEvents.find((event: any) => Number(event.user.jerseyNo) === Number(rollNumber));
      const sportName = sports?.find((sport: any) => sport?._id === event?.sportId?._id)?.sportName;
      if (event) {
        showToast(`${event.user.fullName} marked present for ${sportName}!`, 3000);
        setPresent([...new Set([...present, event._id])])
      } else {
        showToast(`This user has not enrolled in ${sportName}!`, 3000);
      }
    }
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol sizeXl="8" sizeLg="6" sizeSm="12" sizeXs="12">
          <IonItem>
            <IonSelect
              interface="popover"
              value={filterSport}
              onIonChange={(e) => setFilterSport(e.detail.value)}
            >
              <IonSelectOption value="none">Select Sport</IonSelectOption>
              {sports.map(({ _id, sportName }: any) => (<IonSelectOption key={_id} value={_id}>{sportName}</IonSelectOption>))}
            </IonSelect>
          </IonItem>
        </IonCol>
        <IonCol sizeXl="4" sizeLg="6" sizeSm="12" sizeXs="12">
          <IonItem>
            <IonInput
              onIonChange={(e: any) => setSearch(e.detail.value)}
              placeholder="Search"
              clearInput
            />
            {filterSport !== "none" && (
              <IonIcon icon={qrCodeOutline}
                onClick={async () => {
                  const data = await BarcodeScanner.scan();
                  if (data.format === "QR_CODE") {
                    onQRScan(data.text)
                  }
                }}
              />
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        {mergeSearch({
          data: processEvents,
          search,
          options: {
            keys: ["user.jerseyNo", "sportId.sportName", "sportId.sportType", "user.fullName", "user.universityRoll",
              "user.phoneNumber", "user.gender", "user.course", "user.branch", "attendance"]
          }
        })
          .map((event: any) => {
            const color = event.isSearched ? "light" : "";
            const isMale = event.user.gender === GENDER[1].value;
            const isPresent = present.includes(event._id);
            return (
              <IonCol key={event._id} sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" size="12">
                <IonCard className="ion-activatable ripple-parent" color={color} onClick={() => updateModalProfileId(event.user._id)}>
                  <IonRippleEffect />
                  <IonCardHeader>
                    <IonItem color="transparent" lines="none">
                      <IonCardSubtitle>Jersey {event.user.jerseyNo}</IonCardSubtitle>
                      {view
                        ? <IonBadge color={isPresent ? "success" : "danger"} slot="end">{mapValue("ATTENDANCE", event.attendance)}</IonBadge>
                        : <IonToggle color={isPresent ? "success" : "danger"} checked={isPresent} slot="end" onClick={e => {
                          e.stopPropagation();
                          selectPresent(e, event._id)
                        }} />}
                    </IonItem>
                    <IonItem color="transparent" lines="none">
                      <IonCardTitle>{event.user.fullName}</IonCardTitle>
                      <GenderIcon gender={event.user.gender} slot="end" />
                    </IonItem>
                  </IonCardHeader>
                  <IonCardContent color={color}>
                    <IonItem color="transparent" lines="none">
                      <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={americanFootball} />
                      <IonLabel>{event.sportId.sportName}</IonLabel>
                    </IonItem>
                    <IonItem color="transparent" lines="none">
                      <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={megaphone} />
                      <IonLabel>{mapValue("SPORT_TYPE", event.sportId.sportType)}</IonLabel>
                    </IonItem>
                    <IonItem color="transparent" lines="none">
                      <IonBadge color={isMale ? "tertiary" : "pink"} slot="start">URN</IonBadge>
                      <IonLabel>{event.user.universityRoll}</IonLabel>
                    </IonItem>
                    <IonItem color="transparent" lines="none">
                      <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={callSharp} />
                      <IonLabel>{event.user.phoneNumber}</IonLabel>
                    </IonItem>
                  </IonCardContent>
                  {/* <td>{mapValue("COURSE", event.user.course)}</td>
                    <td>{mapValue("BRANCH", event.user.branch)}</td> */}
                </IonCard>
              </IonCol>
            )
          })}
      </IonRow>
      <IonGrid>
        {filterSport === "none" && <IonText color="danger">Please select an event to view the list</IonText>}
        {filterSport !== "none" && processEvents.length === 0 && <IonText color="danger">No records found</IonText>}
      </IonGrid>
      {processEvents.length !== 0 && (
        <IonGrid>
          <IonLabel>Final Attendance</IonLabel>
          <IonRow>
            {processEvents.map((event: any) => {
              const isPresent = present.includes(event._id);
              return (
                <IonBadge
                  key={event._id}
                  style={{ margin: 3 }}
                  color={isPresent ? "success" : "danger"}
                  onClick={e => {
                    e.stopPropagation();
                    selectPresent({ target: { checked: !isPresent } }, event._id)
                  }}
                >Jersey {event.user.jerseyNo}</IonBadge>
              )
            })}
          </IonRow>
        </IonGrid>
      )}
      {!view && processEvents.length !== 0 && <IonButton expand="block" onClick={markAttendance}>Mark Attendance</IonButton>}
    </IonGrid >
  );
};


