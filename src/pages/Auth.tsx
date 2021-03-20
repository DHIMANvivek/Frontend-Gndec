import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';
import { useState } from 'react';

export const Auth: React.FC = () => {

  const [text, setText] = useState<string>();

  return (
    <div className="auth">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <form className="auth-form">
        <IonItem>
          <IonLabel position="floating">Roll Number</IonLabel>
          <IonInput type="text" value={text} onIonChange={e => setText(e.detail.value!)} required></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={text} onIonChange={e => setText(e.detail.value!)} required></IonInput>
        </IonItem>
        <IonButton type="submit" expand="block">Login</IonButton>
      </form>
    </div>
  );
};
