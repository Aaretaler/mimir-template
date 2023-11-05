import "./TextInput.css"

interface Props {
    placeholder: string
}

export const TextInput = (props: Props) => {
    return (
        <input className="textInput" type="text" placeholder={props.placeholder} />
    )
}