import PropTypes from "prop-types"
import React from "react";
import {
  IonChip, IonIcon, IonItem, IonLabel, IonNote,
} from "@ionic/react";
import { trophyOutline } from "ionicons/icons";
import { ATTENDANCE_COLOR, mapValue } from "../constants";

export const EnrolledItem: React.FC<any> = ({ sportType, branch, sportName, genderCategory, position, attendance }) => {
  return (
    <IonItem>
      <IonLabel>
        {(sportType === "relay" || sportType === "tugofwar") &&
          <h2 color="primary">Team: {mapValue("BRANCH", branch)}</h2>
        }
        <h2>{sportName}</h2>
        <h3>{mapValue("SPORT_TYPE", sportType)}</h3>
        <p>{genderCategory}</p>
        {[...Array.from({ length: position }, (_, i) => i + 1)].map((node) => (
          <IonIcon key={node} icon={trophyOutline}></IonIcon>
        ))}
      </IonLabel>
      <IonNote slot="end">
        <IonChip color={ATTENDANCE_COLOR[attendance]}>
          <IonLabel>{mapValue("ATTENDANCE", attendance)}</IonLabel>
        </IonChip>
      </IonNote>
    </IonItem>
  );
};

EnrolledItem.propTypes = {
  attendance: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  genderCategory: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  sportName: PropTypes.string.isRequired,
  sportType: PropTypes.string.isRequired
}
