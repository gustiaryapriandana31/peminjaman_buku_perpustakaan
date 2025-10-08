export default function Button({children, onClick, className = ""}) {
    return (
        <button className={`px-4 py-1 text-white rounded-lg shadow-sm bg-sky-600 hover:bg-sky-800 ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}