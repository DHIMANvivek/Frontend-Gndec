import Axios from 'axios';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import { Auth, Dashboard } from './pages';
import { ENV } from './environment';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './styles/index.scss';
import { useEffect, useState } from 'react';
import { authUser } from './utils/userToken';

Axios.defaults.baseURL = ENV.API_ENDPOINT;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

const App: React.FC = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();

  Axios.defaults.headers.common.Authorization = authUser.getTokenString();

  useEffect(() => {
    const savedUser: any = authUser.getToken();
    setUserData(savedUser);
  }, [])

  const commonProps = { userData, setUserData }

  return (
    <IonSplitPane contentId="sideBar">
      {(location.pathname !== "/login" && location.pathname !== "/signup") && <Menu {...commonProps} />}
      <IonRouterOutlet id="sideBar">
        <Route path="/" exact={true}><Redirect to="/login" /></Route>
        <Route path="/login" component={(props: any) => <Auth {...props} {...commonProps} />} />
        <Route path="/signup" component={(props: any) => <Auth {...props} {...commonProps} />} />
        <Route path="/dashboard" component={(props: any) => <Dashboard {...props} {...commonProps} />} />
        <Redirect to="/login" />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default App;
