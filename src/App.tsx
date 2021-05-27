import Axios from 'axios';
import { useStoreRehydrated } from 'easy-peasy';
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

Axios.defaults.baseURL = ENV.API_ENDPOINT;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

const App: React.FC = () => {
  const isRehydrated = useStoreRehydrated();
  const location = useLocation();

  return isRehydrated ? (
    <IonSplitPane contentId="sideBar">
      {(location.pathname !== "/login" && location.pathname !== "/signup") && <Menu />}
      <IonRouterOutlet id="sideBar">
        <Route path="/" exact={true}><Redirect to="/login" /></Route>
        <Route path="/login" component={(props: any) => <Auth {...props} />} />
        <Route path="/signup" component={(props: any) => <Auth {...props} />} />
        <Route path="/dashboard" component={(props: any) => <Dashboard {...props} />} />
        <Redirect to="/login" />
      </IonRouterOutlet>
    </IonSplitPane>
  ) : (<div>Loading...</div>);
};

export default App;
