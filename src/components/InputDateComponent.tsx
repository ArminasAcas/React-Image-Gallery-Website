import "../css/InputDateComponent.css"

interface InputDateProps {
    id: string,
    name: string,
    value: Date,
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
    isRequired ?: boolean;
};

export default function InputDate(props: InputDateProps) {

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <input
            className="input-date"
            type="date"
            id={props.id}
            name={props.name}
            value={formatDate(props.value)}
            onChange={props.onChange}
            required={props.isRequired ? true : undefined}
        />
    )
}