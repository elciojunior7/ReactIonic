import { IonLoading, IonToast } from '@ionic/react';
import React, { useContext } from 'react';
import { NamesContext } from '../context/NamesContext';

const NameDialogs: React.FC = () => {
    const [namesData, setNamesData] = useContext(NamesContext);

    return (
        <>
            <IonToast
                isOpen={namesData.dialogState === "deleted"}
                message="Name DELETED"
                duration={2000}
                color="danger"
                onDidDismiss={() =>
                    setNamesData({ type: "resetDialog" })
                }
            />
            <IonToast
                isOpen={namesData.dialogState === "added"}
                message="Name ADDED"
                duration={2000}
                onDidDismiss={() =>
                    setNamesData({ type: "resetDialog" })
                }
                color="success"
            />
            <IonToast
                isOpen={namesData.dialogState === "updated"}
                message="Name UPDATED"
                duration={2000}
                onDidDismiss={() =>
                    setNamesData({ type: "resetDialog" })
                }
                color="success"
            />
            <IonLoading isOpen={namesData.dialogState === "initializing"} />
        </>
    )
}

export default NameDialogs;