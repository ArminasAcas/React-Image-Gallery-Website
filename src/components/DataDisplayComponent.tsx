import "../css/DataDisplayComponent.css"

export default function Data(props: {dataName: string, data: string}) {

    return (
        <>
            <div className="data-display"> {props.dataName + ": " + props.data} </div>
        </>
    )

}