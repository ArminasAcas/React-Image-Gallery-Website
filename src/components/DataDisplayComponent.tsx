import "../css/DataDisplayComponent.css"

export default function Data(props: {dataName: string, data: string|null}) {

    return (
        <>
            {props.data ? <div className="data-display"> {props.dataName + ": " + props.data} </div> : null}   
        </>
    )
}