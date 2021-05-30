import React from "react";
import { IonGrid } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";
import { Table } from "../Table";

export const SportsList: React.FC<any> = () => {
  const sports = useStoreState<any>(({ sports }) => sports);

  return (
    <IonGrid>
      <Table data={sports} headings={["Sport Name", "Sport Type", "Sport Gender"]}>
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




