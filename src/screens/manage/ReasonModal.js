import { useEffect, useRef } from "react";
import Label from "../../components/Label";
import Modal from "../../components/Modal";

const ReasonModal = ({
    show,
    title,
    onClose,
    reason,
    onReasonChange,
    onSave,
    onDelete,
    deleteText,
}) => {
    const nameRef = useRef(null);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    const handleSave = async () => {
        if (typeof onSave === "function") {
            onSave();
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    return (
        <Modal
            title={title}
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={onDelete}
            deleteText={deleteText}
        >
            <div>
                <Label>Name</Label>
                <input
                    ref={nameRef}
                    type="text"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={reason}
                    onChange={(e) => onReasonChange(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default ReasonModal;
