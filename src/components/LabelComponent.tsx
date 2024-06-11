import "../css/LabelComponent.css"

export default function Label(props: {htmlFor: string, text: string}) {
    return (
        <label className="label" htmlFor={props.htmlFor}> {props.text} </label>
    )
}