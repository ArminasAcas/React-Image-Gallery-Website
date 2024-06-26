import "../css/InputDateComponent.css"

interface InputDateProps {
    id: string,
    name: string,
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
    isRequired ?: boolean;
};

export default function InputDate(props: InputDateProps) {
    return (
        <>
            <input
                className="input-date"
                type="date"
                id={props.id}
                name={props.name}
                onChange={props.onChange}
                required={props.isRequired ? true : undefined}
            />
        </>
    )
}