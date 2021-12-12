import {
  IonBadge,
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
  checkmarkDoneOutline, checkmarkDoneSharp, checkmarkOutline,
  checkmarkSharp, gameControllerOutline, gameControllerSharp,
  homeOutline, homeSharp, listCircle, listOutline,
  personOutline, personSharp, podiumOutline, podiumSharp,
  trophyOutline, trophySharp, newspaperOutline
} from 'ionicons/icons';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  badge?: string | number;
}


export const Menu: React.FC<any> = () => {
  const location = useLocation();
  const auth = useStoreState<any>(({ auth }) => auth);
  const users = useStoreState<any>(({ users }) => users);
  const allEvents = useStoreState<any>(({ allEvents }) => allEvents);
  const pathname = location.pathname;

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

  const appAdminPages: AppPage[] = [
    {
      title: 'Admin Home',
      url: '/admin',
      iosIcon: homeOutline,
      mdIcon: homeSharp,
      badge: users.length
    },
    {
      title: 'Enrolled Users',
      url: '/admin/enrolled',
      iosIcon: gameControllerOutline,
      mdIcon: gameControllerSharp,
      badge: allEvents.length
    },
    {
      title: 'Mark Attendance',
      url: '/admin/mark-attendance',
      iosIcon: checkmarkOutline,
      mdIcon: checkmarkSharp
    },
    {
      title: 'View Attendance',
      url: '/admin/view-attendance',
      iosIcon: checkmarkDoneOutline,
      mdIcon: checkmarkDoneSharp
    },
    {
      title: 'Mark Result',
      url: '/admin/mark-result',
      iosIcon: podiumOutline,
      mdIcon: podiumSharp
    },
    {
      title: 'View Result',
      url: '/admin/view-result',
      iosIcon: trophyOutline,
      mdIcon: trophySharp
    },
    {
      title: 'Sports List',
      url: '/admin/sports',
      iosIcon: listCircle,
      mdIcon: listOutline
    },
    {
      title: 'Announcements',
      url: '/admin/announcements',
      iosIcon: listCircle,
      mdIcon: newspaperOutline
    },
  ];

  return (
    <IonMenu contentId="main" type="overlay" disabled={pathname === "/login" || pathname === "/signup"} className="side-bar">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{auth.user?.fullName}</IonListHeader>
          <IonNote>{auth.user?.email}</IonNote>
          {(auth.user?.isAdmin ? appAdminPages : appPages).map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                  {appPage.badge && <IonBadge>{appPage.badge}</IonBadge>}
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
