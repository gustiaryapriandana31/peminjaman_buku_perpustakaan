import Labels from "../atoms/Labels";
import InputText from "../atoms/InputText";

export default function FormField({ type, label, name, icon, placeholder, className, ...props }) {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <Labels htmlFor={name}>{label}</Labels>}
            <InputText
                type={type}
                id={name}
                name={name}
                icon={icon}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}