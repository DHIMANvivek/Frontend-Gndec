import React, { useState } from "react";
import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { SPORT_TYPE, mapValue, GENDER, mergeSearch } from "../../constants";
import { americanFootball, female, male, megaphone } from "ionicons/icons";

export const SportsList: React.FC<any> = () => {
  const sports = useStoreState<any>(({ sports }) => sports);
  const [filterSportType, setFilterSportType] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [search, setSearch] = useState('');

  const sportsFiltered = sports.filter((sport: any) => {
    const isGender = filterGender === "all" || filterGender === sport.genderCategory;
    const isSportType = filterSportType === "all" || filterSportType === sport.sportType;
    return isGender && isSportType;
  });

  return (
    <IonGrid>
      <IonRow>
        <IonCol sizeXl="8" sizeLg="6" sizeSm="12" sizeXs="12">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonSelect
                  interface="popover"
                  value={filterSportType}
                  onIonChange={(e) => setFilterSportType(e.detail.value)}
                >
                  <IonSelectOption value="all">All</IonSelectOption>
                  {SPORT_TYPE.map(({ title, value }) => (<IonSelectOption key={value} value={value}>{title}</IonSelectOption>))}
                </IonSelect>
              </IonCol>
              <IonCol>
                <IonSelect
                  interface="popover"
                  value={filterGender}
                  onIonChange={(e) => setFilterGender(e.detail.value)}
                >
                  <IonSelectOption value="all">All</IonSelectOption>
                  {GENDER.map(({ title, value }) => (<IonSelectOption key={value} value={value}>{title}</IonSelectOption>))}
                </IonSelect>
              </IonCol>
            </IonRow>
          </IonGrid>
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
      <IonRow>
        {mergeSearch({
          data: sportsFiltered,
          search,
          options: { keys: ["sportName", "sportType", "genderCategory"] }
        })
          .map((sport: any) => {
            const color = sport.isSearched ? "light" : "";
            const isMale = sport.genderCategory === GENDER[1].value
            return (
              <IonCol key={sport._id} sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" size="12">
                <IonCard color={color}>
                  <IonCardContent color={color}>
                    <IonItem color={color} lines="none">
                      <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={americanFootball} />
                      <IonLabel >
                        {sport.sportName}
                      </IonLabel>
                    </IonItem>
                    <IonItem color={color} lines="none">
                      <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={megaphone} />
                      <IonLabel >
                        {mapValue("SPORT_TYPE", sport.sportType)}
                      </IonLabel>
                    </IonItem>
                    <IonItem color={color} lines="none">
                      <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={sport.genderCategory === GENDER[1].value ? male : female} />
                      <IonLabel >
                        {sport.genderCategory}
                      </IonLabel>
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )
          })}
      </IonRow>
    </IonGrid>
  );
};




