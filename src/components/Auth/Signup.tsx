import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  useIonRouter,
} from "@ionic/react";
import { BRANCH, COURSE, GENDER } from "../../constants";
import { IonInputNew, IonSelectNew } from "../../common";

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
  const [error, setError] = useState<any>({})
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
              const errors = onSubmit({
                fullName,
                email,
                universityRoll,
                phoneNumber,
                password,
                course,
                branch,
                gender
              });
              setError(errors);
            }}
          >
            <IonInputNew
              title="Name"
              value={fullName}
              onChange={setFullName}
              error={error?.fullName}
            />
            <IonInputNew
              title="Email"
              value={email}
              onChange={setEmail}
              error={error?.email}
            />
            <IonInputNew
              title="URN"
              value={universityRoll}
              onChange={setUniversityRoll}
              error={error?.universityRoll}
            />
            <IonInputNew
              title="Password"
              type="password"
              value={password}
              onChange={setPassword}
              error={error?.password}
            />
            <IonInputNew
              title="Phone Number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              error={error?.phoneNumber}
            />
            <IonSelectNew
              title="Course"
              value={course}
              onChange={setCourse}
              data={COURSE}
              error={error?.course}
            />
            <IonSelectNew
              title="Branch"
              value={branch}
              onChange={setBranch}
              data={BRANCH}
              error={error?.branch}
            />
            <IonSelectNew
              title="Gender"
              value={gender}
              onChange={setGender}
              data={GENDER}
              error={error?.gender}
            />
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
