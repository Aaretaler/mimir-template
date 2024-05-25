import { useState } from "react";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import styles from './GamePage.module.css'

export const GamePage = () => {
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
        <TextInput placeholder="Front" value={front} onChange={setFront} />
        <TextInput placeholder="Back" value={back} onChange={setBack} />
        <Button title="Edit" clickHandler={handleEditClick} />
    </div>

)
}