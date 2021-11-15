import React, { useState } from "react";
import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonRippleEffect } from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { GENDER, mergeSearch } from "../../constants";
import { callSharp, checkmarkCircleSharp, closeCircleSharp } from "ionicons/icons";
import { GenderIcon } from "../../common";

export const UsersList: React.FC<any> = () => {
  const users = useStoreState<any>(({ users }) => users);
  const [search, setSearch] = useState('');

  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);

  return (
    <IonGrid>
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
      <IonRow>
        {mergeSearch({
          data: users,
          search,
          options: { keys: ["jerseyNo", "fullName", "email", "universityRoll", "phoneNumber", "gender", "course", "branch", "isVerified"] }
        })
          .map((user: any) => {
            const color = user.isSearched ? "light" : "";
            const isMale = user.gender === GENDER[1].value
            return (
              <IonCol key={user._id} sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" size="12">
                <IonCard className="ion-activatable ripple-parent" color={color} onClick={() => updateModalProfileId(user._id)}>
                  <IonRippleEffect />
                  <IonCardHeader>
                    <IonItem color="transparent" lines="none">
                      <IonCardSubtitle>Jersey {user.jerseyNo}</IonCardSubtitle>
                      {user.isVerified ? (
                        <IonIcon title="Verified" color="success" icon={checkmarkCircleSharp} slot="end" />
                      ) : (
                        <IonIcon title="Not Verified" color="danger" icon={closeCircleSharp} slot="end" />
                      )}
                    </IonItem>
                    <IonItem color="transparent" lines="none">
                      <IonCardTitle>{user.fullName}</IonCardTitle>
                      <GenderIcon gender={user.gender} slot="end" />
                    </IonItem>
                  </IonCardHeader>
                  <IonCardContent color={color}>
                    <IonItem color="transparent" lines="none">
                      <IonBadge color={isMale ? "tertiary" : "pink"} slot="start">URN</IonBadge>
                      <IonLabel>{user.universityRoll}</IonLabel>
                    </IonItem>
                    <IonItem color="transparent" lines="none">
                      <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={callSharp} />
                      <IonLabel>{user.phoneNumber}</IonLabel>
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




