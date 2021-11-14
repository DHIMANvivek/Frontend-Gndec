import React from "react";
import { IonGrid } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";
import { Table } from "../Table";

export const UsersList: React.FC<any> = () => {
  const users = useStoreState<any>(({ users }) => users);
  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  return (
    <IonGrid>
      <Table
        data={users}
        headings={["Jersy No.", "Name", "Email", "URN", "Phone No.", "Gender", "Course", "Branch", "Verified"]}
        searchKeys={["jerseyNo", "fullName", "email", "universityRoll", "phoneNumber", "gender", "course", "branch", "isVerified"]}
      >
        {(data: any) => data.map((user: any) => (
          <tr key={user.jerseyNo} onClick={() => updateModalProfileId(user._id)}>
            <td>{user.jerseyNo}</td>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.universityRoll}</td>
            <td>{user.phoneNumber}</td>
            <td>{mapValue("GENDER", user.gender)}</td>
            <td>{mapValue("COURSE", user.course)}</td>
            <td>{mapValue("BRANCH", user.branch)}</td>
            <td>{user.isVerified ? "Yes" : "No"}</td>
          </tr>
        ))}
      </Table>
    </IonGrid>
  );
};




