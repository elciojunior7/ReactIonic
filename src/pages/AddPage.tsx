import { IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import ContextualNameAdder from '../components/ContextualNameAdder';

const AddPage: React.FC = () => {
    const history = useHistory();
    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Nome</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <ContextualNameAdder onDidSaveName={() => {
                        history.goBack()
                    }} />
                </IonContent>
            </IonPage>
        </>
    )
}

export default AddPage;