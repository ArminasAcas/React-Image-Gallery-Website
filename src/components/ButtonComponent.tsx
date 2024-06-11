import "../css/ButtonComponent.css"

export default function Button(props: {text:string, onClick?: () => void, onClickKeepPressed?: boolean}) {
    let classNames = "button";

    function selectClassNames() {
        if (props.onClickKeepPressed) classNames += " button--pressed"
    }
    
    selectClassNames();
    return <button type="button" onClick={props.onClick} className={classNames}>{props.text}</button>
}