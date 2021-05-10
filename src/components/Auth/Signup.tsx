import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

export const Signup: React.FC<any> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [universityRoll, setUniversityRoll] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [gender, setGender] = useState("");
  console.log(
    fullName,
    email,
    universityRoll,
    password,
    course,
    branch,
    gender
  );

  return (
    <div className='card-container'>
      {/* <div className='card-Signup'> */}
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Welcome here!</IonCardSubtitle>
          <IonCardTitle>Signup</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <form
            onSubmit={() => {
              onSubmit({
                fullName,
                email,
                universityRoll,
                password,
                course,
                branch,
                gender
              });
            }}
          >
            <IonItem>
              <IonLabel position='floating'>Name</IonLabel>
              <IonInput
                required
                value={fullName}
                onIonChange={(e) => setFullName(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput
                required
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>URN</IonLabel>
              <IonInput
                required
                value={universityRoll}
                onIonChange={(e) => setUniversityRoll(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Password</IonLabel>
              <IonInput
                type='password'
                required
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Course</IonLabel>
              <IonSelect
                okText='Okay'
                cancelText='Dismiss'
                value={course}
                onIonChange={(e) => setCourse(e.detail.value)}
              >
                <IonSelectOption value='black'>Btech</IonSelectOption>
                <IonSelectOption value='red'>B. Arch</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Branch</IonLabel>
              <IonSelect
                okText='Okay'
                cancelText='Dismiss'
                value={branch}
                onIonChange={(e) => setBranch(e.detail.value)}
              >
                <IonSelectOption value='black'>Computer</IonSelectOption>
                <IonSelectOption value='red'>IT</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Gender</IonLabel>
              <IonSelect
                okText='Okay'
                cancelText='Dismiss'
                value={gender}
                onIonChange={(e) => setGender(e.detail.value)}
              >
                <IonSelectOption value='black'>Male</IonSelectOption>
                <IonSelectOption value='red'>Female</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonButton
              className='item-text-wrap'
              color='primary'
              expand='full'
              shape='round'
              type='submit'
            >
              Signup
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
      {/* </div> */}
    </div>
  );
};
