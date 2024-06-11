import React, { FormEvent, ReactNode } from "react";
import "../css/FormComponent.css"
import Container from "./ContainerComponent";

interface FormProps {
    children: ReactNode;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Form(props: FormProps) {

    return(
        <Container type="small">
            <form className="form__container" onSubmit={props.onSubmit}>
                {props.children}
            </form>
        </Container>
    )
}