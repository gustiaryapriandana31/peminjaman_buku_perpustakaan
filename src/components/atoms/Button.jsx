export default function Button({children, type, className = ""}) {
    return (
        <button type={type} className={`px-4 py-1 text-white rounded-lg shadow-sm bg-sky-600 hover:bg-sky-800 ${className}`}>
            {children}
        </button>
    )
}