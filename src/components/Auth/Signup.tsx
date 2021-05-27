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
  useIonRouter,
} from "@ionic/react";
import { BRANCH, COURSE, GENDER } from "../../constants";

export const Signup: React.FC<any> = ({ onSubmit }) => {
  const router = useIonRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [universityRoll, setUniversityRoll] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [gender, setGender] = useState("");

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
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({
                fullName,
                email,
                universityRoll,
                phoneNumber,
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
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput
                required
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>URN</IonLabel>
              <IonInput
                required
                value={universityRoll}
                onIonChange={(e) => setUniversityRoll(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Password</IonLabel>
              <IonInput
                type='password'
                required
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='floating'>Phone Number</IonLabel>
              <IonInput
                required
                value={phoneNumber}
                onIonChange={(e) => setPhoneNumber(e.detail.value!)}
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
                {COURSE.map(({ title, value }) => (<IonSelectOption value={value}>{title}</IonSelectOption>))}
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
                {BRANCH.map(({ title, value }) => (<IonSelectOption value={value}>{title}</IonSelectOption>))}
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
                {GENDER.map(({ title, value }) => (<IonSelectOption value={value}>{title}</IonSelectOption>))}
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
            <IonButton
              onClick={() => router.push('/login')}
              buttonType="clear"
              color="secondary"
              expand="block"
              className="item-text-wrap"
            >
              Already have account? click here to login
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
      {/* </div> */}
    </div>
  );
};
