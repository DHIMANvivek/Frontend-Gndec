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
import { BRANCH, ARCHITECTURE, COMPUTER_APPLICATION, BUSINESS_ADMINISTRATION, TWO_YEARS, THREE_YEARS, FOUR_YEARS, FIVE_YEARS, COURSE, GENDER } from "../../constants";
import { IonInputNew, IonSelectNew } from "../../common";

export const Signup: React.FC<any> = ({ onSubmit, loading }) => {
  const router = useIonRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [universityRoll, setUniversityRoll] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState<any>({})

  const getBranchCourse = (selectedCourse: any) => {
    switch (selectedCourse) {
      case 'b_tech':
      case 'm_tech':
        return BRANCH;
      case 'mca':
      case 'bca':
        return COMPUTER_APPLICATION;
      case 'bba':
      case 'mba':
        return BUSINESS_ADMINISTRATION;
      case 'b_arch':
        return ARCHITECTURE;
      default:
        return [];
    }
  }

  const getCourseYears = (selectedCourse: any) => {
    switch (selectedCourse) {
      case 'b_tech':
        return FOUR_YEARS;
      case 'm_tech':
        return TWO_YEARS;
      case 'bca':
        return THREE_YEARS;
      case 'mca':
        return TWO_YEARS;
      case 'bba':
        return THREE_YEARS;
      case 'mba':
        return TWO_YEARS;
      case 'b_arch':
        return FIVE_YEARS;
      default:
        return [];
    }
  }

  return (
    <div className='card-container'>
      {/* <div className='card-Signup'> */}
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Welcome here!</IonCardSubtitle>
          <IonCardTitle>Signup for GNDEC Annual Sports Meet 2022</IonCardTitle>
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
                year,
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
              title="University Roll Number"
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
              data={getBranchCourse(course)}
              error={error?.branch}
            />
            <IonSelectNew
              title="Year"
              value={year}
              onChange={setYear}
              data={getCourseYears(course)}
              error={error?.year}
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
              disabled={loading}
            >
              Click Here to Login
            </IonButton>
            <IonButton
              href="https://forms.gle/cJYcxvhAH1eR3NGcA"
              buttonType="clear"
              color="secondary"
              expand="block"
              target="_blank"
              className="item-text-wrap"
              style={{ textDecoration: "underline", fontSize: "11px" }}
            >
              Need help? Click here to contact!
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
      {/* </div> */}
    </div>
  );
};
