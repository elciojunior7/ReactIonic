import { IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import ContextualNameList from '../components/ContextualNameList';

const ListPage: React.FC = () => {
    const history = useHistory();
    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nomes</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <ContextualNameList />
                    <IonFab slot="fixed" horizontal="end" vertical="bottom">
                        <IonFabButton onClick={() => history.push('/names/add')}>
                            +
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        </>
    )
}

export default ListPage;