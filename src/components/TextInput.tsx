import "./TextInput.css"
import "./TextInput.css"

interface Props {
    placeholder: string
    value: string;
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: Props) => {
    return (
        <input className="textInput" value={props.value} type="text" placeholder={props.placeholder} onChange={props.onChange} />
    )
}