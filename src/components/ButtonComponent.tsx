import "../css/ButtonComponent.css"

export default function Button(props: {text:string, onClick?: () => void, onClickKeepPressed?: boolean, variant?: string}) {
    let classNames = "button ";

    function selectClassNames() {
        switch(props.variant) {
            case "mini": classNames += " button--mini";
        }
        if (props.onClickKeepPressed) classNames += " button--pressed";
    }
    
    selectClassNames();
    return <button type="button" onClick={props.onClick} className={classNames}>{props.text}</button>
}