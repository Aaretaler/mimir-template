import "./TableHeader.css"
import React, { useState } from 'react';

interface Props {
    title: string
    resetSortArrow:()=>void;
    onClick: (event: React.MouseEvent<HTMLButtonElement>, sortOrder: React.SetStateAction<"asc" | "desc" | "none">) => void;
}

export const TableHeader = (props: Props) => {

    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

    const resetSortArrow=()=>
    {
        setSortOrder("none");
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        let nextSortOrder: "asc" | "desc" | "none" = sortOrder;
        switch(sortOrder)
        {
            case "none":
                nextSortOrder="asc";
            break;

            case "asc":
                nextSortOrder="desc";
            break;

            case "desc":
                nextSortOrder="none";
            break;
        }
        setSortOrder(nextSortOrder);
        props.onClick(event, nextSortOrder);
    }
    
    let sortArrow = "";
    if(sortOrder==="asc"){
        sortArrow = "▲"
    }
    else if(sortOrder==="desc"){
        sortArrow = "▼"
    }
    else if(sortOrder==="none"){
        sortArrow = ""
    }
    
    return (
        <button className="tableHeader" onClick={handleClick}>
        {props.title + sortArrow}
    </button>
    )
}