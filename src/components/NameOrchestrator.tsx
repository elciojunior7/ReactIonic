import React, { useState } from 'react';
import NameList from './NameList';
import NameSetter from './NameSetter';

const NameOrchestrator: React.FC = () => {
    const [nameList, setNameList] = useState<string[]>([]);
    const [indexToEdit, setIndexToEdit] = useState<number|undefined>();

    const handleNewName = (name: string) => {
        const newNameList = [name, ...nameList];
        setNameList(newNameList)
    }

    const handleDeleteName = (index: number) => {
        const newNameList = [...nameList];
        newNameList.splice(index, 1);
        setNameList(newNameList);
    }

    const handleEditName = (name: string) =>{
        const newNameList = [...nameList];
        newNameList.splice(indexToEdit!, 1, name);
        setNameList(newNameList);
        setIndexToEdit(undefined);
    }

    return (
        <>
            <NameSetter 
                initialValue={
                    indexToEdit !== undefined 
                        ? nameList[indexToEdit] 
                        : undefined
                }
                label="Seu nome" 
                placeholder="Digite seu nome" 
                onNameSave={indexToEdit !== undefined ? handleEditName : handleNewName} />
            <NameList nameList={nameList} 
                onDelete={handleDeleteName} 
                onEdit={setIndexToEdit}
            />
        </>
    )
}

export default NameOrchestrator;