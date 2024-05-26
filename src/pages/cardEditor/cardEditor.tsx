import styles from './cardEditor.module.css';
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import { Card } from '../../models/Card'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useReducer } from 'react';
import { reducer } from '../../store/reducer';
import { useNavigate } from 'react-router-dom'
import { updateCard } from '../../store/action';

const initialState: Card[] = [];

export const CardEditor = () => {
    let [back, setBack] = useState('');
    let [front, setFront] = useState('');
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (id) {
            const selectedCard = getCardById(id);
            if (selectedCard) {
                setFront(selectedCard.front);
                setBack(selectedCard.back);
            }
        }
    }, [id,state]);

    const handleEditClick = () => {
        console.log("Edit button clicked!");
        updateCard(state.find((card: Card) => card.id === id),dispatch)
        navigate('/');
        
    };

    const getCardById = (id: string): Card | undefined => {
        return state.find((card: Card) => card.id === id);// ToDo herrausfinden raum diese Funktion noch nicht tut
    };

    return (
        <div className={styles.cardEditor}>
            <div className={styles.TableHeader}>Front</div>
            <div className={styles.TableHeader}>Back</div>
            <div />
            <TextInput placeholder="" value={front} onChange={setFront} />
            <TextInput placeholder="" value={back} onChange={setBack} />
            <Button title="Update" clickHandler={handleEditClick} />
        </div>
    )
}