import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router';

const StartPage: React.FC = () => {
    const history = useHistory();
    const handleClick = () => history.push("/names");

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonTitle>Começo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton onClick={handleClick}>
                    Go Home
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default StartPage;