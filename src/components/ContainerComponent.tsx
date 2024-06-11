import { ReactNode } from "react";
import "../css/ContainerComponent.css"

interface ContainerProps {
    children: ReactNode;
    type?: string;
}

export default function Container({children, type} : ContainerProps) {

    return (
        <div className={type == "small" ? "container container--small" : "container"}>
            {children}
        </div>
    )
}