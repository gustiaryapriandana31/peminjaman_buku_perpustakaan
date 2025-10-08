import Labels from "../atoms/Labels";
import SelectBox from "../atoms/SelectBox";

export default function FormFieldSelect({ label, name, icon, placeholder, className, ...props }) {
    return (
        <div className={`mb-4 ${className}`}>
            {label && <Labels htmlFor={name}>{label}</Labels>}
            <SelectBox
                id={name}
                name={name}
                icon={icon}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}