import React from 'react';
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonIcon, IonFabButton, IonGrid } from '@ionic/react';
import { logoInstagram, logoGithub, logoLinkedin } from 'ionicons/icons';

const DEV_TEAM = [
  {
    name: 'Divyanshu Garg',
    github: 'https://github.com/theamanjs',
    linkedin: 'https://www.linkedin.com/in/theamanjs/',
    instagram: 'https://www.instagram.com/notoriousgabroo/',
    role: 'Full Stack Developer',
    image: 'https://cdn141.picsart.com/301439887256201.jpg',
  },
  {
    name: 'Amanjot Singh',
    github: 'https://github.com/theamanjs',
    linkedin: 'https://www.linkedin.com/in/theamanjs/',
    instagram: 'https://www.instagram.com/notoriousgabroo/',
    role: 'Frontend Developer',
    image: 'https://avatars.githubusercontent.com/u/38748298?v=4',
  },
  {
    name: 'Dashmeet Singh',
    github: 'https://github.com/theamanjs',
    linkedin: 'https://www.linkedin.com/in/theamanjs/',
    instagram: 'https://www.instagram.com/notoriousgabroo/',
    role: 'QA & Testing Engineer',
    image: 'https://cdn141.picsart.com/301439887256201.jpg',
  },
  {
    name: 'Tania Sharma',
    github: 'https://github.com/theamanjs',
    linkedin: 'https://www.linkedin.com/in/theamanjs/',
    instagram: 'https://www.instagram.com/notoriousgabroo/',
    role: 'QA & Testing Engineer',
    image: 'https://cdn141.picsart.com/301439887256201.jpg',
  },

]

export const DevTeam: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        {DEV_TEAM.map((member, index) => (
          <IonCol sizeXl="4" sizeLg="6" sizeMd="6" sizeSm="6" size="12">
            <IonCard className="ion-activatable ripple-parent">
              <IonCardHeader>
                <IonItem color="transparent" lines="none" className="ion-justify-content-between">
                  <div style={{ "borderRadius": "500px", "height": "110px", "overflow": "hidden", "marginRight": "12px" }}>
                    <img style={{ "height": "110px" }} src={member.image} alt="person"></img>
                  </div>
                  <div>
                    <IonRow style={{ "flexDirection": "column" }} className="ion-justify-self-center">
                      <IonCardTitle style={{ "fontSize": "20px" }}>{member.name}</IonCardTitle>
                      <IonCardSubtitle style={{ "fontSize": "10px" }}>{member.role}</IonCardSubtitle>
                      <IonRow style={{ "marginTop": "8px" }}>
                        <IonFabButton target="_blank" href={member.github} color="dark" className="ion-social-btn" size="small" style={{ "margin": "2px 4px" }}>
                          <IonIcon icon={logoGithub} />
                        </IonFabButton>
                        <IonFabButton target="_blank" href={member.linkedin} color="dark" className="ion-social-btn" size="small" style={{ "margin": "2px 4px" }}>
                          <IonIcon icon={logoLinkedin} />
                        </IonFabButton>
                        <IonFabButton target="_blank" href={member.instagram} color="dark" className="ion-social-btn" size="small" style={{ "margin": "2px 4px" }}>
                          <IonIcon icon={logoInstagram} />
                        </IonFabButton>
                      </IonRow>
                    </IonRow>
                  </div>
                </IonItem>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid >
  );
};
