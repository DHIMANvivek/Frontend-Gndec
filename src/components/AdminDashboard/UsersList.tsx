import React from "react";
import { IonGrid } from "@ionic/react";
import { useStoreState } from "easy-peasy";
import { mapValue } from "../../constants";

export const UsersList: React.FC<any> = () => {
  const users = useStoreState<any>(({ users }) => users);
  return (
    <IonGrid>
      <table className="ionic-table">
        <thead>
          <tr>
            <th>Jersy No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>URN</th>
            <th>Phone No.</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Branch</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.jerseyNo}>
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
        </tbody>
      </table>
    </IonGrid>
  );
};




