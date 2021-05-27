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
import { useStoreState } from 'easy-peasy';
import { useLocation } from 'react-router-dom';

import {
  homeOutline, homeSharp, personOutline, personSharp
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
    mdIcon: personSharp
  }
];

const Menu: React.FC<any> = ({ }) => {
  const location = useLocation();
  const auth = useStoreState<any>(({ auth }) => auth);

  return (
    <IonMenu contentId="sideBar" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{auth.user?.fullName}</IonListHeader>
          <IonNote>{auth.user?.email}</IonNote>
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
