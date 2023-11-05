import "./TableHeader.css"

interface Props {
    title: string
    sortOrder: "asc" | "desc"
}

export const TableHeader = (props: Props) => {
    
    let sortArrow = "";
    if(props.sortOrder==="asc"){
        sortArrow = "▲"
    }
    else if(props.sortOrder==="desc"){
        sortArrow = "▼"
    }
    
    return (
        <div className="tableHeader">{props.title + sortArrow}</div>
    )
}