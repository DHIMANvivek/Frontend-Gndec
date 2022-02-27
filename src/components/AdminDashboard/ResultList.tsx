import React, { useEffect, useState } from "react";
import { IonBadge, IonButton, IonCard, IonContent, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRippleEffect, IonRow, IonSelect, IonSelectOption, IonText, IonToggle, useIonToast } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { API, GENDER, mapValue, mergeSearch } from "../../constants";
import Axios from "axios";
import { americanFootball, callSharp, megaphone, trophyOutline } from "ionicons/icons";
import { GenderIcon } from "../../common";
import { Virtuoso } from "react-virtuoso";

export const ResultList: React.FC<any> = ({ view = false }) => {
  const [filterSport, setFilterSport] = useState('none');

  const [showToast] = useIonToast();
  const users = useStoreState<any>(({ users }) => users);
  const sports = useStoreState<any>(({ sports }) => sports);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const storeAllEvents = useStoreActions<any>(({ storeAllEvents }) => storeAllEvents);
  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  const [search, setSearch] = useState('');

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
    })
    .filter((event: any) => filterSport === "all" || event.sportId._id === filterSport);

  const [result, setResult] = useState<any>([]);

  useEffect(() => {
    setAlreadyResult();
  }, [filterSport])

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

  const sortedData = mergeSearch({
    data: processData,
    search,
    options: {
      keys: [
        "user.jerseyNo", "sportId.sportName", "sportId.sportType", "user.fullName",
        "user.universityRoll", "user.phoneNumber", "user.gender", "user.course", "user.branch", "event.position"
      ]
    }
  });

  return (
    <IonGrid className="h-full flex-column">
      <IonRow>
        <IonCol sizeXl="8" sizeLg="6" sizeSm="12" sizeXs="12">
          <IonItem>
            <IonSelect
              interface="popover"
              style={{ width: "100%" }}
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
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="h-full">
        <IonContent className="h-full">
          <Virtuoso
            style={{ height: '100%' }}
            totalCount={sortedData.length}
            itemContent={index => {
              const event = sortedData[index];
              const color = event.isSearched ? "light" : "";
              const isMale = event.user.gender === GENDER[1].value;
              return (
                <IonCol key={event._id} sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" size="12">
                  <IonCard className="ion-activatable ripple-parent" color={color} onClick={() => updateModalProfileId(event.user._id)}>
                    <IonRippleEffect />
                    <IonCardHeader>
                      <IonItem color="transparent" lines="none">
                        <IonCardSubtitle>Jersey {event.user.jerseyNo}</IonCardSubtitle>
                        {view && (
                          <IonChip style={{ padding: 0, margin: 0 }} color="transparent" slot="end">
                            {[...Array.from({ length: event.position }, (_, i) => i + 1)].map((node) => (
                              <IonIcon style={{ margin: 3, marginRight: 0 }} color="success" key={node} icon={trophyOutline}></IonIcon>
                            ))}
                          </IonChip>
                        )}
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
                      {!view && (
                        <IonSelect interface="popover"
                          onClick={(e) => e.stopPropagation()}
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
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              )
            }}
          ></Virtuoso>
        </IonContent>
      </IonRow>
      <IonGrid>
        {filterSport === "none" && <IonText color="danger">Please select an sport to view the list</IonText>}
        {filterSport !== "none" && processData.length === 0 && <IonText color="danger">No records found</IonText>}
      </IonGrid>
      {/* {processData.length !== 0 && (
        <IonGrid>
          <IonLabel>Final Result</IonLabel>
          <IonRow>
            {processData.map((event: any) => {
              const position = result.find((node: any) => event._id === node._id)?.value;
              return position ? (
                <IonBadge
                  key={event._id}
                  style={{ margin: 3 }}
                  color="success"
                >
                  {`Jersey ${event.user.jerseyNo} : `}
                  {[...Array.from({ length: position }, (_, i) => i + 1)].map((node) => (
                    <IonIcon key={node} icon={trophyOutline}></IonIcon>
                  ))}
                </IonBadge>
              ) : " "
            })}
          </IonRow>
        </IonGrid>
      )} */}
      {!view && processData.length !== 0 && <IonButton expand="block" onClick={markResult}>Save Result</IonButton>}
    </IonGrid >
  );
};
