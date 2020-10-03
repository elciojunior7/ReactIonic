import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Home.css';
import NameOrchestrator from '../components/NameOrchestrator';
import { chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Home: React.FC = () => {

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/*<IonButton onClick={() => history.goBack()} >
              <IonIcon icon={chevronBack} />
            </IonButton>*/}
            <IonBackButton />
          </IonButtons>
          <IonTitle>Usuário</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <NameOrchestrator />
      </IonContent>
    </IonPage>
  );
};

export default Home;
