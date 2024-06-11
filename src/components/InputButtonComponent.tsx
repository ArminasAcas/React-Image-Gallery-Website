import "../css/InputButtonComponent.css"

export default function InputButton(props: {type:string, value:string}) {
    return (
        <input className="input-button" type={props.type} value={props.value}></input>
    )
}