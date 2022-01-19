import { useState } from 'react';
import * as C from './styles';
import { Item } from '../../types/Item';

import { categories } from '../../data/categories';

type Props = {
    onAdd: (item: Item) => void;
}

export const InputArea = ({ onAdd }: Props) => {
    const [dataField, setDataField] = useState('');
    const [titleField, setTitleField] = useState('');
    const [valueField, setValueField] = useState(0);
    const [categoryField, setCategoryField] = useState('');

    let categoryKeys: string[] = Object.keys(categories);

    const handleAddEvent = () => {
        let erros: string[] = [];

        if (isNaN(new Date(dataField).getTime())) {
            erros.push('Data Inválida');
        }
        if (!categoryKeys.includes(categoryField)) {
            erros.push('Categoria inválida!');
        }
        if (titleField === '') {
            erros.push('Titulo vazio!');
        }
        if (valueField <= 0) {
            erros.push('Valor inválido');
        }

        if (erros.length > 0) {
            alert(erros.join("\n"));
        } else {
            onAdd({
                date: new Date(dataField),
                category: categoryField,
                title: titleField,
                value: valueField
            });
            clearFields();
        }
    }

    const clearFields = () => {
        setDataField('');
        setTitleField('');
        setCategoryField('');
        setValueField(0);
    }

    return (
        <C.Container>
            <C.InputLabel>
                <C.InputTitle>Data</C.InputTitle>
                <C.Input type="date" value={dataField} onChange={e => setDataField(e.target.value)} />
            </C.InputLabel>

            <C.InputLabel>
                <C.InputTitle>Categoria</C.InputTitle>
                <C.Select value={categoryField} onChange={e => setCategoryField(e.target.value)}>
                    <>
                        <option></option>
                        {categoryKeys.map((key, index) => (
                            <option key={index} value={key}>{categories[key].title}</option>
                        ))}
                    </>
                </C.Select>
            </C.InputLabel>

            <C.InputLabel>
                <C.InputTitle>Título</C.InputTitle>
                <C.Input type="text" value={titleField} onChange={e => setTitleField(e.target.value)} />
            </C.InputLabel>

            <C.InputLabel>
                <C.InputTitle>Valor</C.InputTitle>
                <C.Input type="number" value={valueField} onChange={e => setValueField(parseFloat(e.target.value))} />
            </C.InputLabel>

            <C.InputLabel>
                <C.InputTitle>&nbsp;</C.InputTitle>
                <C.Button onClick={handleAddEvent}>Adicionar</C.Button>
            </C.InputLabel>



        </C.Container>
    )
}