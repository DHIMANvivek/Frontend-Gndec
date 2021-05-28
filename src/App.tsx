import React, { useEffect } from 'react';
import Axios from 'axios';
import { useStoreActions, useStoreRehydrated } from 'easy-peasy';
import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import { Auth, Dashboard, AdminDashboard } from './pages';
import { ENV } from './environment';
import { API } from './constants';
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

Axios.defaults.baseURL = ENV.API_ENDPOINT;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

const App: React.FC = () => {
  const storeSports = useStoreActions<any>((actions) => actions.storeSports);
  const isRehydrated = useStoreRehydrated();
  const location = useLocation();
  useEffect(() => {
    Axios.get(API.GET_SPORTS)
      .then(result => storeSports(result.data))
      .catch(() => { });
  });
  return isRehydrated ? (
    <IonSplitPane contentId="sideBar">
      {(location.pathname !== "/login" && location.pathname !== "/signup") && <Menu />}
      <IonRouterOutlet id="sideBar">
        <Route path="/" exact={true}><Redirect to="/login" /></Route>
        <Route path="/login" component={(props: any) => <Auth {...props} />} />
        <Route path="/signup" component={(props: any) => <Auth {...props} />} />
        <Route path="/dashboard" component={(props: any) => <Dashboard {...props} />} />
        <Route path="/admin" component={(props: any) => <AdminDashboard {...props} />} />
        <Redirect to="/login" />
      </IonRouterOutlet>
    </IonSplitPane>
  ) : (<div>Loading...</div>);
};

export default App;
