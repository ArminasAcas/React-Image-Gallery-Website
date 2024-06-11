import "../css/HeaderComponent.css"

export default function Header(props: {text:string}) {
    return (
        <h1 className="header">{props.text}</h1>
    )
}