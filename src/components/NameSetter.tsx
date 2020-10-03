import React, { useEffect, useRef, useState } from 'react';
import { IonInput, IonButton, IonAlert } from '@ionic/react';

type NameSetterProps = {
    label: string
    initialValue?: string
    placeholder: string
    buttonLabel?: string //? torna o campo opcional
    onNameSave: (name: string) => void
}

function isValid(name: string): boolean{
    return name.length > 0
}

function useValidName(
    validNames: string[], initialName?: string
): [
    string | undefined, 
    React.Dispatch<React.SetStateAction<string | undefined>>, 
    boolean
]{
    const [name, setName] = useState<string | undefined>(initialName);
    return[
        name, 
        setName, 
        isValid(name ?? "") && validNames.indexOf(name ?? "") > -1
    ]
}

const NameSetter: React.FC<NameSetterProps> = (props: NameSetterProps) => {
    //const nameState = useState<string | undefined | null>(undefined);
    //const name = nameState[0];
    //const setName= nameState[1];
    const {label, initialValue, placeholder, buttonLabel, onNameSave} = props;
    const [name, setName, isValid] = useValidName(["teste", "elcio"], initialValue);
    const[isNameEmptyAlertOpen, setNameEmptyAlertOpen]= useState(false);// useState é hook
    
    const inputRef = useRef<HTMLIonInputElement>(null); //useRef é um hook que fornece uma referencia para o campo texto

    useEffect(
        () => {
            setName(initialValue)
            return () => {
                console.log("Encerrando Componente que tinha valor ", initialValue)
            }
        },
        [initialValue]
    )

    const handleClick = () => {
        if(!name?.trim().length){
            setNameEmptyAlertOpen(true);
            return;
        }
        onNameSave(name)
        setName('')
        inputRef.current!.setFocus()
    }
    
    return (
        <div style={{ padding: 15, maxWidth:250 }}>
            <label htmlFor="name">{label}: {name} </label><br/>
            <IonInput 
                ref={inputRef} //referencia para o componente/campo input para poder usar o foco no campo
                type="text" 
                id="name" 
                style={{ border: 'solid 1px black' }} 
                placeholder={placeholder} 
                value={name} //value permite alterar o campo input na tela quando houver alteração no name (isso resulta no estado alterar o campo)
                onIonChange={(e) => setName(e.detail.value ?? '') } 
            /><br/>
            <IonButton onClick={handleClick}>Salvar {buttonLabel}</IonButton>

            <IonAlert
                isOpen={isNameEmptyAlertOpen}
                onDidDismiss={() => setNameEmptyAlertOpen(false)}
                header="Erro"
                message='Nome Vazio!'
                buttons={[
                    "Fechar", 
                    {
                        text: "Voltar para o campo",
                        handler: () => inputRef.current!.setFocus()
                    }
                ]}
            />
        </div>
    );
}

type NameSetterState = {
    name: string | undefined | null;
}

class NameSetterClass extends React.Component<NameSetterProps, NameSetterState> {
    // constructor(props: NameSetterProps){
    //     super(props);
    // } se construtor só chama o super, nao precisa dele pra usar o props pq o javascript
    // faz herança de construtor
    state: NameSetterState = {
        name: undefined
    }
    render() {
        return (
            <div style={{ padding: 15, maxWidth:250 }}>
                <label htmlFor="name">{this.props.label}: {this.state.name}</label><br/>
                <IonInput type="text" id="name" style={{ border: 'solid 1px black' }} placeholder={this.props.placeholder}
                           onIonChange={(e) => {
                               this.setState({name: e.detail.value})
                            }}/><br/>
                <IonButton onClick={() => alert("Seu nome é " + this.state.name )}>{this.props.buttonLabel}</IonButton>
            </div>
        );
    }
}

export default NameSetter;