import { ReactNode } from "react";
import "../css/ButtonListComponent.css"

interface ButtonListProps {
    children: ReactNode;
}

export default function ButtonList({children}: ButtonListProps) {
    return ( <div className="button-list">{children}</div> )
}