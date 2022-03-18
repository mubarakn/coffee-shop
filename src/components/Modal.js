import ReactDOM from "react-dom";

const Modal = ({ show, children, title, onCancel, onSave, width }) => {
    if (!show) {
        return null;
    }

    const view = (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-slate-500 bg-opacity-50">
            <div
                className={`${
                    !width ? "w-1/4" : width
                } rounded-md overflow-hidden shadow-lg`}
            >
                <div className="bg-white">
                    <h2 className="text-slate-700 p-4 text-xl">{title}</h2>
                </div>
                <div className="bg-slate-100 p-4 border-y border-slate-200">
                    {children}
                </div>
                <div className="bg-white flex p-4">
                    <button
                        onClick={onCancel}
                        className="ml-auto text-slate-400 border px-4 py-2 border-slate-300 hover:text-slate-500 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="ml-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(view, document.getElementById("modal-root"));
};

export default Modal;
