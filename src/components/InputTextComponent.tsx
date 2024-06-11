import "../css/InputTextComponent.css"

interface InputTextProps {
    id: string,
    name: string,
    type: string,
    value: string,
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
    isRequired ?: boolean;
    minLenght ?: number;
    maxLenght ?: number;
};

export default function InputText(props: InputTextProps) {

    return (
        <input 
            className="input-text" 
            type={props.type} 
            id={props.id} name={props.name} 
            value={props.value} 
            onChange={props.onChange} 
            required={props.isRequired ? true : undefined}
            minLength={props.minLenght ? props.minLenght : undefined}
            maxLength={props.maxLenght ? props.maxLenght : undefined}>
        </input>
    )
}