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
} from "@ionic/react";
import { Route } from "react-router-dom";

export const Login: React.FC<any> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const redirectToSignup = () => {
  //   return <Route path="/signup" />
  // };

  return (
    <div className="card-container">
      {/* <div className='card-login'> */}
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Welcome here!</IonCardSubtitle>
          <IonCardTitle>Login</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <form onSubmit={() => {
              onSubmit({
                email,
                password
              })
            }}>
            <IonItem>
              <IonInput
                required
                placeholder="Email"
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                required
                type="password"
                placeholder="Password"
                onIonChange={(e) => setPassword(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
            <br />
            <IonButton
              type="submit"
              className="item-text-wrap"
              color="primary"
              expand="full"
              shape="round"
            >
              Login
            </IonButton>
            {/* <IonButton
              onClick={() => redirectToSignup()}
              className="item-text-wrap"
            >
              Don't have account? click here to signup
            </IonButton> */}
          </form>
        </IonCardContent>
      </IonCard>
      {/* </div> */}
    </div>
  );
};
