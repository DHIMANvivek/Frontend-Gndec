import React, { useState } from "react";
import { IonCol, IonGrid, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { SPORT_TYPE, mapValue, GENDER } from "../../constants";
import { Table } from "../Table";

export const SportsList: React.FC<any> = () => {
  const sports = useStoreState<any>(({ sports }) => sports);
  const [filterSportType, setFilterSportType] = useState('all');
  const [filterGender, setFilterGender] = useState('all');

  const sportsFiltered = sports.filter((sport: any) => {
    const isGender = filterGender === "all" || filterGender === sport.genderCategory;
    const isSportType = filterSportType === "all" || filterSportType === sport.sportType;
    return isGender && isSportType;
  });

  return (
    <IonGrid>
      <Table
        data={sportsFiltered}
        headings={["Sport Name", "Sport Type", "Sport Gender"]}
        searchKeys={["sportName", "sportType", "genderCategory"]}
        filters={<IonGrid>
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
        }
      >
        {(data: any) => data.map((sport: any) => (
          <tr key={sport._id}>
            <td>{sport.sportName}</td>
            <td>{mapValue("SPORT_TYPE", sport.sportType)}</td>
            <td>{sport.genderCategory}</td>
          </tr>
        ))}
      </Table>
    </IonGrid>
  );
};




