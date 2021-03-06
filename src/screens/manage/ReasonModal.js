import { useEffect, useRef, useState } from "react";
import Label from "../../components/Label";
import Modal from "../../components/Modal";
import {
    createReason,
    updateReason,
    deleteReason,
    getReason,
} from "./services/reasonsService";

const ReasonModal = ({ id, type, title, show, onClose, onSave, onDelete }) => {
    const reasonRef = useRef(null);
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (show) {
            reasonRef.current.focus();
            !id && setReason("");
        }
    }, [show]);

    useEffect(() => {
        if (id) {
            getReason(id).then((response) => {
                setReason(response.data.reason);
            });
        }
    }, [id]);

    const handleSave = async () => {
        if (id) {
            updateReason(id, reason).then((response) => {
                if (response.status === 202 && typeof onSave === "function") {
                    onSave({ id, type, reason });
                }
            });
        } else {
            createReason(type, reason).then((response) => {
                const { id, reason } = response.data;
                if (response.status === 201 && typeof onSave === "function") {
                    onSave({ id, type, reason });
                }
            });
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure, you want to delte this reason?")) {
            deleteReason(id).then((response) => {
                if (response.status === 204 && typeof onDelete === "function") {
                    onDelete();
                }
            });
        }
    };

    return (
        <Modal
            title={(id ? "Edit " : "Create ") + title}
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Reason"}
        >
            <div>
                <Label>Reason</Label>
                <input
                    ref={reasonRef}
                    type="text"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default ReasonModal;
