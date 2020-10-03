import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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

/* Theme variables */
import './theme/variables.css';
import StartPage from './pages/StartPage';
import { NamesContextProvider } from './context/NamesContext';
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import NameDialogs from './components/NameDialogs';

const App: React.FC = () => (
  <IonApp>
    <NamesContextProvider>
      <IonReactRouter>
        <Route path="/" >
          <NameDialogs />
        </Route>
        <IonRouterOutlet>
          <Route path="/home" component={Home} exact={true} />
          <Route exact path="/" component={StartPage} />
          <Route exact path="/names" component={ListPage} />
          <Route exact path="/names/add" component={AddPage} />
          <Route exact path="/names/:userId/edit" component={EditPage} />
        </IonRouterOutlet>
      </IonReactRouter>
    </NamesContextProvider>
  </IonApp>
);

export default App;
