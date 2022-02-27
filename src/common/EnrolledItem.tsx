import PropTypes from "prop-types"
import React, { useState } from "react";
import {
  IonChip, IonIcon, IonItem, IonLabel, IonLoading, IonNote, IonCol, IonCard, IonCardHeader, useIonAlert, useIonToast, IonButton, IonCardContent
} from "@ionic/react";
import { closeCircle, americanFootball, sad, medal, ribbon, } from "ionicons/icons";
import { ATTENDANCE_COLOR, mapValue, API } from "../constants";
import Axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";

export const EnrolledItem: React.FC<any> = ({ sportType, branch, sportName, genderCategory, position, attendance, eventId }) => {
  const [loading, setLoading] = useState(false);
  const deleteEventbyId = useStoreActions<any>((actions) => actions.deleteEventbyId);
  const auth = useStoreState<any>(({ auth }) => auth);
  const [showToast] = useIonToast();
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

  const deleteEvent = (deleteEventId: string) => {
    setLoading(true);
    Axios.post(API.DELETE_EVENT, { eventIds: [deleteEventId] })
      .then(() => {
        deleteEventbyId(deleteEventId);
        showToast('User removed from team successfully', 3000);
      })
      .catch(() => {
        showToast('Error deleting event', 3000);
      })
      .finally(() => {
        setLoading(false);
      });
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
    <>
      <IonLoading
        isOpen={loading}
        message={'Hold on... Enjoy the wheater meanwhile!'}
      />
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
                {(mapValue("ATTENDANCE", attendance) !== "Present" && auth?.user?.isAdmin) && (
                  <IonButton
                    slot="end"
                    color="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      showAlert(`Do you want to remove user enrollment from event ${sportName}?`, [
                        { text: "Yes", handler: () => deleteEvent(eventId) },
                        { text: "No" }
                      ])
                    }}>
                    Remove Enrollment
                    <IonIcon
                      slot="end"
                      icon={closeCircle}
                      style={{ cursor: "pointer" }}
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
    </>
  );
};

EnrolledItem.propTypes = {
  attendance: PropTypes.string.isRequired,
  branch: PropTypes.string.isRequired,
  genderCategory: PropTypes.string.isRequired,
  position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  sportName: PropTypes.string.isRequired,
  sportType: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
}
