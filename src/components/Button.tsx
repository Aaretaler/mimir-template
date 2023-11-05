import "./Button.css"

interface Props {
    title: string
}

export const Button = (props: Props) => {
    return (
        <input className="button" type="button" value={props.title} />
    )
}