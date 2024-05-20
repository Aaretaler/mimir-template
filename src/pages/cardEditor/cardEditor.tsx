import styles from './cardEditor.module.css';
import { TextInput } from '../../components/TextInput'
import { Button } from '../../components/Button'
import { Card } from '../../models/Card'
import { useState } from 'react'

interface Props {
    item: Card
}

export const CardEditor = () => {
    let [back, setBack] = useState('')
    let [front, setFront] = useState('')

const handleEditClick = () => {
    // Hier kannst du die Logik einfügen, die beim Klick auf den Button ausgeführt werden soll.
    console.log("Edit button clicked!");
};

return (
    <div className={styles.cardEditor}>
        <div className={styles.TableHeader}>Front</div>
        <div className={styles.TableHeader}>Back</div>
        <div />
        <TextInput placeholder="Front" value={''} onChange={setFront} />
        <TextInput placeholder="Back" value={''} onChange={setBack} />
        <Button title="Edit" clickHandler={handleEditClick} />
    </div>

)
}