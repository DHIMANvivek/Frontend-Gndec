import React, { useState } from "react";
import { IonBadge, IonCard, IonCardContent, IonContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonRippleEffect } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { GENDER, mapValue, mergeSearch } from "../../constants";
import { americanFootball, callSharp } from "ionicons/icons";
import { GenderIcon } from "../../common";
import { Virtuoso } from "react-virtuoso";

export const EnrolledUsers: React.FC<any> = () => {
  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);

  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  const [search, setSearch] = useState('');
  const processedUsers: any = {};
  users.forEach((user: any) => { processedUsers[user._id] = user; });
  const processData = allEvents.map((event: any) => ({ ...event, user: processedUsers[event.userId] }));

  const sortedData = mergeSearch({
    data: processData,
    search,
    options: {
      keys: [
        "user.jerseyNo", "sportId.sportName", "sportId.sportType", "user.fullName", "user.year",
        "user.universityRoll", "user.phoneNumber", "user.gender", "user.course", "user.branch"
      ]
    }
  })


  return (
    <IonGrid className="h-full flex-column">
      <IonRow>
        <IonCol sizeXl="8" sizeLg="6" sizeSm="12" sizeXs="12">
          {/* {filters} */}
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
              const isMale = event.user.gender === GENDER[1].value
              return (
                <IonCol key={event._id} sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" size="12">
                  <IonCard className="ion-activatable ripple-parent" color={color} onClick={() => updateModalProfileId(event.user._id)}>
                    <IonRippleEffect />
                    <IonCardHeader>
                      <IonItem color="transparent" lines="none">
                        <IonCardSubtitle>Jersey {event.user.jerseyNo}</IonCardSubtitle>
                        <IonBadge color={isMale ? "tertiary" : "pink"} slot="end">{mapValue("SPORT_TYPE", event.sportId.sportType)}</IonBadge>
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
                        <IonBadge color={isMale ? "tertiary" : "pink"} slot="start">URN</IonBadge>
                        <IonLabel>{event.user.universityRoll}</IonLabel>
                      </IonItem>
                      <IonItem color="transparent" lines="none">
                        <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={callSharp} />
                        <IonLabel>{event.user.phoneNumber}</IonLabel>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              )
            }}
          >
          </Virtuoso>
        </IonContent>
      </IonRow>
    </IonGrid>
  );
};
