/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from "react";
import {
  IonBadge, IonCard, IonCardContent, IonSegment,
  IonSegmentButton, IonContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle, IonCol, IonGrid,
  IonIcon, IonInput, IonItem, IonLabel,
  IonRippleEffect, IonRow, IonSelect, IonSelectOption,
  IonText, useIonToast, IonFab, IonFabButton, IonFabList, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonList, IonListHeader
} from "@ionic/react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { API, GENDER, mapValue, ATTENDANCE, mergeSearch } from "../../constants";
import Axios from "axios";
import {
  americanFootball, callSharp, caretUp, checkmarkCircle, closeCircle,
  ellipseSharp, megaphone, qrCodeOutline, reader, skull
} from "ionicons/icons";
import { GenderIcon, Excel } from "../../common";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Virtuoso } from "react-virtuoso";

export const AttendanceList: React.FC<any> = ({ view = false }) => {
  const modalRef = useRef<any>();
  const [isModal, setIsModal] = useState(false);
  const [filterSport, setFilterSport] = useState('none');

  const [showToast] = useIonToast();
  const users = useStoreState<any>(({ users }) => users);
  const sports = useStoreState<any>(({ sports }) => sports);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const storeAllEvents = useStoreActions<any>(({ storeAllEvents }) => storeAllEvents);
  const updateModalProfileId = useStoreActions<any>((actions) => actions.updateModalProfileId);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const objectifiedUsers: any = {};
  users.forEach((user: any) => { objectifiedUsers[user._id] = user; });

  const processEvents = allEvents
    .map((event: any) => ({ ...event, user: objectifiedUsers[event.userId] }))
    .filter((event: any) => event?.sportId?._id === filterSport);

  const markAttendance = (attendance: any, id: string) => {
    setIsLoading(true);
    const attendanceData = {
      eventId: id,
      attendance
    }
    Axios.post(API.MARK_ATTENDANCE, attendanceData)
      .then(() => {
        const updatedAllEvents: any = allEvents.map((event: any) => {
          if (event._id === attendanceData.eventId) {
            event.attendance = attendanceData.attendance;
          }
          return event;
        });
        storeAllEvents(updatedAllEvents);
        showToast(`Attendance marked as ${mapValue("ATTENDANCE", attendanceData.attendance)}!`, 1000);
      })
      .catch(() => {
        showToast("Something went wrong!", 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onQRScan = (jerseyNo: string) => {
    if (processEvents.length) {
      const event = processEvents.find((event: any) => Number(event.user.jerseyNo) === Number(jerseyNo));
      const sportName = sports?.find((sport: any) => sport?._id === event?.sportId?._id)?.sportName;
      if (event) {
        showToast(`${event?.user?.fullName} marked present for ${sportName}!`, 3000);
        markAttendance('present', event?._id);
      } else {
        showToast(`This user has not enrolled in ${sportName}!`, 3000);
      }
    }
  }
  const sortedData = mergeSearch({
    data: processEvents,
    search,
    sort: (a: any, b: any) => {
      return a?.user?.jerseyNo - b?.user?.jerseyNo;
    },
    options: {
      keys: ["user.jerseyNo", "sportId.sportName", "sportId.sportType", "user.fullName", "user.universityRoll", "user.year",
        "user.phoneNumber", "user.gender", "user.course", "user.branch", "attendance"],
    }
  });

  const currentSport = sports?.find((sport: any) => sport?._id === filterSport);
  return (
    <IonGrid className="h-full flex-column">
      <IonRow>
        <Excel />
        <IonCol sizeXl="8" sizeLg="6" sizeSm="12" sizeXs="12">
          <IonItem>
            <IonSelect
              interface="alert"
              style={{ width: "100%", maxWidth: "100%" }}
              value={filterSport}
              onIonChange={(e) => setFilterSport(e.detail.value)}
            >
              <IonSelectOption value="none">Select Sport</IonSelectOption>
              {sports.map(({ _id, sportName }: any) => (<IonSelectOption key={_id} value={_id}>{sportName}</IonSelectOption>))}
            </IonSelect>
          </IonItem>
        </IonCol>
        <IonCol sizeXl="4" sizeLg="6" sizeSm="12" sizeXs="12">
          <IonItem>
            <IonInput
              onIonChange={(e: any) => setSearch(e.detail.value)}
              placeholder="Search"
              clearInput
            />
            {filterSport !== "none" && (
              <IonIcon icon={qrCodeOutline}
                onClick={async () => {
                  const data = await BarcodeScanner.scan();
                  if (data.format === "QR_CODE") {
                    onQRScan(data.text)
                  }
                }}
              />
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="h-full">
        <IonContent className="h-full">
          <Virtuoso
            style={{ height: '100%' }}
            totalCount={sortedData.length}
            itemContent={index => {
              const event = sortedData[index];
              const color = event.isSearched ? "light" : "";
              const isMale = event?.user?.gender === GENDER[1].value;
              return (
                <IonCol key={event._id} sizeXl="3" sizeLg="4" sizeMd="6" sizeSm="12" size="12">
                  <IonCard className="ion-activatable ripple-parent" color={color} onClick={() => updateModalProfileId(event?.user?._id)}>
                    <IonRippleEffect />
                    <IonCardHeader>
                      <IonItem color="transparent" lines="none">
                        <IonCardSubtitle>Jersey {event?.user?.jerseyNo}</IonCardSubtitle>
                      </IonItem>
                      <IonItem color="transparent" lines="none">
                        <IonCardTitle>{event?.user?.fullName}</IonCardTitle>
                        <GenderIcon gender={event?.user?.gender} slot="end" />
                      </IonItem>
                    </IonCardHeader>
                    <IonCardContent color={color}>
                      <IonItem color="transparent" lines="none">
                        <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={americanFootball} />
                        <IonLabel>{event.sportId.sportName}</IonLabel>
                      </IonItem>
                      <IonItem color="transparent" lines="none">
                        <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={megaphone} />
                        <IonLabel>{mapValue("SPORT_TYPE", event.sportId.sportType)}</IonLabel>
                      </IonItem>
                      <IonItem color="transparent" lines="none">
                        <IonBadge color={isMale ? "tertiary" : "pink"} slot="start">URN</IonBadge>
                        <IonLabel>{event?.user?.universityRoll}</IonLabel>
                      </IonItem>
                      <IonItem color="transparent" lines="none">
                        <IonIcon color={isMale ? "tertiary" : "pink"} slot="start" icon={callSharp} />
                        <IonLabel>{event?.user?.phoneNumber}</IonLabel>
                      </IonItem>
                    </IonCardContent>
                    {!view && (
                      <IonCardHeader>
                        <IonSegment
                          mode="ios"
                          onClick={(e) => e.stopPropagation()}
                          value={event.attendance}
                          disabled={isLoading}
                        >
                          {ATTENDANCE.map((attendance: any) => (
                            <IonSegmentButton key={attendance.value} value={attendance.value} onClick={() => markAttendance(attendance.value, event._id)}>
                              <IonLabel>{attendance.title}</IonLabel>
                            </IonSegmentButton>
                          ))}
                        </IonSegment>
                      </IonCardHeader>
                    )}
                  </IonCard>
                </IonCol>
              )
            }}
          />
          {filterSport !== "none" && (
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton>
                <IonIcon icon={caretUp} />
              </IonFabButton>
              <IonFabList side="top">
                <IonFabButton onClick={() => setIsModal(true)}><IonIcon icon={reader} /></IonFabButton>
                <IonFabButton><IonIcon icon={skull} /></IonFabButton>
              </IonFabList>
            </IonFab>
          )}
        </IonContent>
      </IonRow>
      <IonGrid>
        {filterSport === "none" && <IonText color="danger">Please select an event to view the list</IonText>}
        {filterSport !== "none" && processEvents.length === 0 && <IonText color="danger">No records found</IonText>}
      </IonGrid>

      <IonModal ref={modalRef} isOpen={isModal} onDidDismiss={() => setIsModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={() => modalRef.current.dismiss()}>
                <IonIcon slot="icon-only" icon={closeCircle} />
              </IonButton>
            </IonButtons>
            <IonTitle style={{ textAlign: "center" }}>
              {`Attendance ${currentSport?.sportName} (${mapValue("GENDER", currentSport?.genderCategory)})`}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonInput
            onIonChange={(e: any) => setSearch(e.detail.value)}
            placeholder="Search"
            clearInput
          />
          {filterSport !== "none" && (
            <IonIcon icon={qrCodeOutline}
              onClick={async () => {
                const data = await BarcodeScanner.scan();
                if (data.format === "QR_CODE") {
                  onQRScan(data.text)
                }
              }}
            />
          )}
        </IonItem>
        <IonContent className="h-full">
          <IonList className="h-full" style={{ padding: 0 }}>
            <Virtuoso
              style={{ height: '100%' }}
              totalCount={sortedData.length}
              itemContent={index => {
                const event = sortedData[index];
                return (
                  <IonItem
                    style={{ display: "flex", flexDirection: "column" }}
                    onClick={() => updateModalProfileId(event?.user?._id)}
                  >
                    <IonListHeader>
                      <IonLabel style={{ padding: "12px 0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <h2 style={{ marginRight: "24px" }}>Jersey {event?.user?.jerseyNo}</h2>
                          <h2 style={{ textTransform: "capitalize" }}>{event?.user?.fullName}</h2>
                        </div>
                        {!view && (
                          <IonSegment
                            mode="ios"
                            onClick={(e) => e.stopPropagation()}
                            value={event.attendance}
                            disabled={isLoading}
                            style={{ marginTop: "12px" }}
                          >
                            {ATTENDANCE.map((attendance: any) => (
                              <IonSegmentButton
                                key={attendance.value}
                                value={attendance.value}
                                onClick={() => markAttendance(attendance.value, event._id)}
                              >
                                <IonLabel>{attendance.title}</IonLabel>
                              </IonSegmentButton>
                            ))}
                          </IonSegment>
                        )}
                      </IonLabel>
                    </IonListHeader>
                    {view && (
                      <>
                        {event.attendance === "present" && <IonIcon color="green" icon={checkmarkCircle} slot="end" />}
                        {event.attendance === "absent" && <IonIcon color="danger" icon={closeCircle} slot="end" />}
                        {event.attendance === "not_marked" && <IonIcon color="medium" icon={ellipseSharp} slot="end" />}
                      </>
                    )}
                  </IonItem>
                )
              }}
            />
          </IonList>
        </IonContent>
      </IonModal>

    </IonGrid >
  );
};


