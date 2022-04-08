import ReactDOM from "react-dom";
import Button from "./Button";

const Modal = ({
    show,
    children,
    title,
    onCancel,
    onSave,
    width,
    deleteText,
    onDelete,
}) => {
    if (!show) {
        return null;
    }

    const view = (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center bg-slate-500 bg-opacity-50">
            <div
                className={`${
                    !width ? "w-1/4" : width
                } rounded-md shadow-lg py-1 bg-white`}
            >
                <div className="bg-white">
                    <h2 className="text-slate-700 p-4 text-xl">{title}</h2>
                </div>
                <div className="bg-slate-100 p-4 border-y border-slate-200">
                    {children}
                </div>
                <div className="bg-white flex items-center p-4">
                    {deleteText && (
                        <button
                            className="text-pink-500 hover:underline font-light text-sm"
                            onClick={() =>
                                typeof onDelete === "function" && onDelete()
                            }
                        >
                            {deleteText}
                        </button>
                    )}
                    <Button onClick={onCancel} title="Cancel" />
                    <Button
                        onClick={onSave}
                        title="Save"
                        primary
                        className="ml-2"
                    />
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(view, document.getElementById("modal-root"));
};

export default Modal;
