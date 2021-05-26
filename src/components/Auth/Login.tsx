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
  useIonRouter,
} from "@ionic/react";

export const Login: React.FC<any> = ({ onSubmit }) => {
  const router = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirectToSignup = () => {
    router.push('/signup')
  };

  return (
    <div className="card-container">
      {/* <div className='card-login'> */}
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Welcome here!</IonCardSubtitle>
          <IonCardTitle>Login</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <form method="post" onSubmit={(e) => { e.preventDefault(); onSubmit({ email, password }) }}>
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
            <IonButton
              type="submit"
              className="item-text-wrap"
              color="primary"
              expand="full"
              shape="round"
            >
              Login
            </IonButton>
            <IonButton
              onClick={() => redirectToSignup()}
              buttonType="clear"
              color="secondary"
              expand="block"
              className="item-text-wrap"
            >
              Don't have account? click here to signup
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
      {/* </div> */}
    </div>
  );
};
