import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonItem,
  useIonRouter,
} from "@ionic/react";

export const Login: React.FC<any> = ({ onSubmit }) => {
  const router = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="card-container">
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Login</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <form method="post" onSubmit={(e) => { e.preventDefault(); onSubmit({ email, password }) }}>
            <IonItem>
              <IonInput
                type="email"
                placeholder="Email"
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
                value={email}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonInput
                type="password"
                placeholder="Password"
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
                value={password}
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
              onClick={() => router.push('/signup')}
              buttonType="clear"
              color="secondary"
              expand="block"
              className="item-text-wrap"
              style={{ textDecoration: "underline" }}
            >
              Don't have account? click here to signup
            </IonButton>
          </form>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
