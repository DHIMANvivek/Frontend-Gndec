import React from "react";
import { IonGrid } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";

export const SportsList: React.FC<any> = () => {
  const sports = useStoreState<any>(({ sports }) => sports);

  return (
    <IonGrid>
      <table className="ionic-table">
        <thead>
          <tr>
            <th>Sport Name</th>
            <th>Sport Type</th>
            <th>Sport Gender</th>
          </tr>
        </thead>
        <tbody>
          {sports.map((sport: any) => (
            <tr key={sport._id}>
              <td>{sport.sportName}</td>
              <td>{mapValue("SPORT_TYPE", sport.sportType)}</td>
              <td>{sport.genderCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </IonGrid>
  );
};




