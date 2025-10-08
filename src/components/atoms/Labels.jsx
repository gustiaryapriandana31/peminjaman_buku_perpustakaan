export default function Labels({htmlFor, children}) {
    return (
        <label htmlFor={htmlFor}
            className="block font-medium text-white tex2t-lg mb- dark:text-white">
            {children}
        </label>
    );
}