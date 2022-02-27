import PropTypes from "prop-types"
import React from "react";
import {
  IonChip, IonIcon, IonItem, IonLabel, IonNote, IonCol, IonCard, IonCardHeader, useIonAlert, IonButton, IonCardContent
} from "@ionic/react";
import { closeCircle, americanFootball, sad, medal, ribbon, } from "ionicons/icons";
import { ATTENDANCE_COLOR, mapValue } from "../constants";

export const EnrolledItem: React.FC<any> = ({ sportType, branch, sportName, genderCategory, position, attendance }) => {
  const [showAlert] = useIonAlert();
  const genderWiseColor = genderCategory === "Male" ? "tertiary" : "pink";
  const PositionEventComponent = (icon: string | undefined, varColor: string, position: any) => {
    return (
      <>
        <IonIcon slot="start" icon={icon} color={varColor} />
        <IonLabel>{position}</IonLabel>
      </>
    )
  }

  const bakePosition = (pos: any) => {
    switch (pos) {
      case 1:
        return (
          PositionEventComponent(medal, "gold", "1st")
        );
      case 2:
        return (
          PositionEventComponent(medal, "silver", "2nd")
        );
      case 3:
        return (
          PositionEventComponent(medal, "bronze", "3rd")
        );
      default:
        return (
          PositionEventComponent(sad, genderWiseColor, "Participant")
        );;
    }
  }

  return (
    <IonItem>
      <IonCol size="12">
        {(sportType === "relay" || sportType === "tugofwar") &&
          <h2 color="primary">Team: {mapValue("BRANCH", branch)}</h2>
        }
        <IonCard className="ion-activatable ripple-parent">
          <IonCardHeader>
            <IonItem color="transparent" lines="none">
              <IonNote slot="start">
                <IonChip color={ATTENDANCE_COLOR[attendance]}>
                  <IonLabel>{mapValue("ATTENDANCE", attendance)}</IonLabel>
                </IonChip>
              </IonNote>
              {mapValue("ATTENDANCE", attendance) === "Not Marked" && (
                < IonButton slot="end" color="danger">
                  Remove Enrollment
                  <IonIcon
                    slot="end"
                    icon={closeCircle}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      showAlert("Remove from Team?", [
                        { text: "Yes", handler: () => console.log('log') },
                        { text: "No" }
                      ])
                    }}
                  />
                </IonButton>
              )}
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            <IonItem color="transparent" lines="none">
              <IonIcon slot="start" icon={americanFootball} color={genderWiseColor} />
              <IonLabel>{mapValue("SPORT_TYPE", sportType)}</IonLabel>
            </IonItem>
            <IonItem color="transparent" lines="none">
              <IonIcon slot="start" icon={ribbon} color={genderWiseColor} />
              <IonLabel>{sportName}</IonLabel>
            </IonItem>
            {mapValue("ATTENDANCE", attendance) !== 'Not Marked' && (
              <IonItem color="transparent" lines="none">
                {bakePosition(position)}
              </IonItem>
            )}
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonItem >
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
