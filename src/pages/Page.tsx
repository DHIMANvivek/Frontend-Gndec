import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { useStoreActions } from 'easy-peasy';
import { logOutOutline } from 'ionicons/icons';
import { useLocation } from 'react-router';

const TOOLBAR_TITLE: any = {
  "/dashboard": "Dashboard",
  "/dashboard/profile": "Profile",

  "/admin": "Admin Dashboard",
  "/admin/enrolled": "Enrolled Users",
  "/admin/mark-attendance": "Mark Attendance",
  "/admin/view-attendance": "View Attendance",
  "/admin/mark-result": "Mark Result",
  "/admin/view-result": "View Result",
  "/admin/sports": "Sports List",
}

export const PageLayout: React.FC = ({ children }) => {
  const location = useLocation();
  const router = useIonRouter();
  const logout = useStoreActions<any>((actions) => actions.logOut);

  const pathname = location.pathname;
  const logOut = () => {
    logout();
    router.push("/login")
  }
  return (
    <IonPage>
      <IonHeader hidden={pathname === "/login" || pathname === "/signup"}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={true} />
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton onClick={logOut}>
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>{TOOLBAR_TITLE[pathname]}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {children}
      </IonContent>
    </IonPage>
  );
};
