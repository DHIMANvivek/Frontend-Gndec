import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  homeOutline, homeSharp, personOutline
} from 'ionicons/icons';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/dashboard',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Profile',
    url: '/dashboard/profile',
    iosIcon: personOutline,
    mdIcon: personOutline
  }
];

const Menu: React.FC<any> = ({ userData }) => {
  const location = useLocation();
  return (
    <IonMenu contentId="sideBar" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{userData.fullName}</IonListHeader>
          <IonNote>{userData.email}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
