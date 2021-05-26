import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import { Auth, Dashboard } from './pages';

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

const App: React.FC = () => {
  const location = useLocation();
  return (
    <IonSplitPane contentId="sideBar">
      {(location.pathname !== "/login" && location.pathname !== "/signup") && <Menu />}
      <IonRouterOutlet id="sideBar">
        <Route path="/" exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact={true} component={(props: any) => <Auth {...props} />} />
        <Route path="/signup" exact={true} component={(props: any) => <Auth {...props} />} />
        <Route path="/dashboard" exact={true} component={(props: any) => <Dashboard {...props} />} />
        <Redirect to="/login" />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

export default App;
