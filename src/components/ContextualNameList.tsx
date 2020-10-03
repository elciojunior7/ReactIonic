import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { NamesContext } from '../context/NamesContext';
import NameList from './NameList';

const ContextualNameList: React.FC = () => {
    const history = useHistory();
    const [namesData, setNamesData] = useContext(NamesContext);

    return (
        <NameList
            nameList={namesData.names}
            onDelete={(index) => setNamesData({
                type: "delete", indexToDelete: index
            })}
            onEdit={(index) => {
                // setNamesData({
                //     type: "edit", indexToEdit: index
                // })
                history.push(`/names/${index}/edit`)
            }}
        />
    )
}

export default ContextualNameList;