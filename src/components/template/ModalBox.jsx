import { motion, AnimatePresence } from "framer-motion";

export default function ModalBox({ title, show, onClose, children }) {
    if (!show) return null;

    return (
        <AnimatePresence>
        {show && (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >
                {/* Klik di luar modal untuk menutup */}
                <div
                    className="absolute inset-0"
                    onClick={onClose}
                ></div>

                {/* Modal content */}
                <motion.div
                    className="relative z-10 w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-xl text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                    </div>
                    <div>{children}</div>
                </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    );
}
