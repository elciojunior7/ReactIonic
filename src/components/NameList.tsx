import { IonAlert, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonTitle } from '@ionic/react';
import React, { useState } from 'react';
import { trash, createSharp } from "ionicons/icons"

type NameListProps = {
    nameList?: string[]
    onDelete: (elementIndex: number) => void
    onEdit: (elementIndex: number) => void
}

const NameList: React.FC<NameListProps> = (props: NameListProps) => {
    const {nameList, onDelete, onEdit} = props;
    const [indexToDelete, setIndexToDelete] = useState<number|undefined>();

    const handleDelete = (itemIndex: number) => {
        setIndexToDelete(itemIndex);
    };

    return (
        <>
            <IonList>
                {nameList?.map((name, index) => (
                    <IonItemSliding key={name}>
                        <IonItem>
                            <IonTitle>{name}</IonTitle>
                        </IonItem>
                        <IonItemOptions side="end">
                            <IonItemOption
                                color="secondary"
                                onClick={() => onEdit(index)}
                            >
                                <IonIcon icon={createSharp} />
                            </IonItemOption>
                            <IonItemOption
                                color="danger"
                                onClick={() => handleDelete(index)}
                            >
                                <IonIcon icon={trash} />
                            </IonItemOption>   
                        </IonItemOptions>
                    </IonItemSliding>
                ))}
            </IonList>
            <IonAlert
                isOpen={indexToDelete !== undefined}
                onDidDismiss={() => setIndexToDelete(undefined)}
                message={`Deseja mesmo deletar 
                    ${indexToDelete !== undefined ? nameList![indexToDelete] : ''
                }?`}
                buttons={[
                    'Do nothing',
                    {
                        text: "Go!",
                        handler: () => onDelete(indexToDelete!)
                    }
                ]}
            />
        </>
    )
}

export default NameList;