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
    secondaryAction,
}) => {
    if (!show) {
        return null;
    }

    const view = (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-slate-500 bg-opacity-50">
            <div
                className={`max-w-4xl rounded-md shadow-lg py-1 bg-white mx-auto`}
            >
                <div className="bg-white">
                    <h2 className="text-slate-700 p-4 text-xl">{title}</h2>
                </div>
                <div className="bg-slate-100 p-4 border-y border-slate-200">
                    {children}
                </div>
                <div className="bg-white flex items-center p-4">
                    {secondaryAction ? secondaryAction : null}
                    {deleteText && typeof onDelete === "function" && (
                        <button
                            className="text-pink-500 hover:underline font-light text-sm"
                            onClick={() => onDelete()}
                        >
                            {deleteText}
                        </button>
                    )}
                    <div className="ml-auto flex">
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
        </div>
    );

    return ReactDOM.createPortal(view, document.getElementById("modal-root"));
};

export default Modal;
