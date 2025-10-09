export default function Button({children, type, onClick, className = ""}) {
    return (
        <button type={type} onClick={onClick} className={`px-4 py-1 text-white rounded-lg shadow-sm ${className}`}>
            {children}
        </button>
    )
}