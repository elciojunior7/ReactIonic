import React, { useEffect, useReducer } from 'react';
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;
const KEY_NAMES = "names";

function saveNamesOnStorage(names: string[]){
    Storage.set({
        key: KEY_NAMES, 
        value: JSON.stringify(names)
    });
}
async function loadNames(): Promise<string[]> {
    try { 
        const { value } = await Storage.get({ key: KEY_NAMES});
        if(value){
            const names = JSON.parse(value) as string[];
            return names;
        }
        return [];
    } catch (ex) { 
        console.error(ex)
        throw ex;
    }
}

export type NamesData = {
    names: string[]
    dialogState?: "added" | "updated" | "deleted" | "initializing"
}

const DEFAULT_NAMESDATA: NamesData = {
    names: [
        // "Tester", "Elcio", 'Junior', 'Luke', 'Skywalker'
    ],
    dialogState: "initializing"
};

export type NamesDataAction =
    { type: "initialize", names: string[] } |
    { type: "add", nameToAdd: string } |
    { type: "delete", indexToDelete: number } |
    { type: "edit", indexToEdit: number } |
    { type: "update", indexToUpdate: number, newName: string } |
    { type: "resetDialog" };

export const NamesContext = React.createContext<
    [NamesData, React.Dispatch<NamesDataAction>]
>([DEFAULT_NAMESDATA, () => {}])

export const NamesContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children
}: React.PropsWithChildren<{}>) => {
    const reducer = useReducer(
        (currentState: NamesData, action: NamesDataAction) => {
            switch (action.type){
                case "add": {
                    const names = [action.nameToAdd, ...currentState.names];
                    const newState: NamesData = { 
                        ...currentState,
                        names,
                        dialogState: "added"
                    };
                    saveNamesOnStorage(names);
                    return newState;
                 } case "delete": {
                    const names = [...currentState.names];
                    names.splice(action.indexToDelete, 1);
                    const newState: NamesData = { 
                        ...currentState,
                        names,
                        dialogState: "deleted"
                    };
                    saveNamesOnStorage(names);
                    return newState;
                } case "update": {
                    const names = [...currentState.names];
                    names.splice(action.indexToUpdate, 1, action.newName);
                    const newState: NamesData = { 
                        ...currentState,
                        names,
                        dialogState: "updated"
                    };
                    saveNamesOnStorage(names);
                    return newState;
                } case "edit": {
                    const names = [...currentState.names];
                    const nameToEdit = currentState.names[action.indexToEdit];
                    const newState: NamesData = { 
                        ...currentState,
                        names,
                    };
                    return newState;
                } case "resetDialog": {
                    const names = [...currentState.names];
                    const newState: NamesData = { 
                        ...currentState,
                        names,
                        dialogState: undefined
                    };
                    return newState;
                }case "initialize": {
                    const newState: NamesData = { 
                        ...currentState,
                        names: action.names,
                        dialogState: undefined
                    };
                    return newState;
                }
            }
            
            return currentState;            
        },
        DEFAULT_NAMESDATA
    )

    useEffect(() => {
        // setTimeout(
        //     () => Storage.get({key: KEY_NAMES})
        //         .then(({value}) => { 
        //             if(value){
        //                 const names = JSON.parse(value) as string[];
        //                 reducer[1]({ type: "initialize", names })
        //             }
        //         })
        //         .catch(console.error),
        //     3000
        // )
        setTimeout(
            () => loadNames()
                .then((names) => 
                    reducer[1]({ type: "initialize", names })
                )
                .catch(() => {}),
            3000
        )
    }, [])

    return(
        <NamesContext.Provider value={reducer}>
            {children}
        </NamesContext.Provider>
    )
}