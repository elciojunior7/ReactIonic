import { IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import NameSetter from '../components/NameSetter';
import { NamesContext } from '../context/NamesContext';

const EditPage: React.FC = () => {
    const [namesData, setNamesData] = useContext(NamesContext);
    const {userId} = useParams<{ userId: string}>();
    const intUserId = parseInt(userId);

    const history = useHistory();
    const [username, setUsername] = useState('');
    useEffect(() => setUsername(namesData.names[intUserId]), [intUserId])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Atualizar</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <NameSetter 
                    label="Novo Nome" 
                    placeholder={username}
                    onNameSave={(newName) => {
                        setNamesData({ type: "update", indexToUpdate: intUserId, newName})
                        history.goBack()
                    }}
                />
            </IonContent>
        </IonPage>
    )
}

export default EditPage;