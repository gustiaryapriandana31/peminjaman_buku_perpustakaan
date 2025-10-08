export default function InputText({icon, placeholder, ...props}) {
    return (
        <div className="relative">
            {icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className={`text-gray-500 ${icon}`} />
                </div>
            )}
            
            <input {...props} className="w-full py-3 pl-10 pr-3 text-white transition-all duration-200 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={placeholder}/>
        </div>
    )
}