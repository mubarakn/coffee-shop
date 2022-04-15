import { useEffect, useRef, useState } from "react";
import Label from "../../components/Label";
import Modal from "../../components/Modal";
import {
    createTag,
    updateTag,
    deleteTag,
    getTag,
} from "./services/tagsService";

const TagModal = ({ id, type, title, show, onClose, onSave, onDelete }) => {
    const tagRef = useRef(null);
    const [tag, setTag] = useState("");

    useEffect(() => {
        if (show) {
            tagRef.current.focus();
            !id && setTag("");
        }
    }, [show]);

    useEffect(() => {
        if (id) {
            getTag(id).then((response) => {
                setTag(response.data.tag);
            });
        }
    }, [id]);

    const handleSave = async () => {
        if (id) {
            updateTag(id, tag).then((response) => {
                if (response.status === 202 && typeof onSave === "function") {
                    onSave({ id, type, tag });
                }
            });
        } else {
            createTag(type, tag).then((response) => {
                const { id, tag } = response.data;
                if (response.status === 201 && typeof onSave === "function") {
                    onSave({ id, type, tag });
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
        if (window.confirm("Are you sure, you want to delte this tag?")) {
            deleteTag(id).then((response) => {
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
            deleteText={id && "Delete Tag"}
        >
            <div>
                <Label>Tag</Label>
                <input
                    ref={tagRef}
                    type="text"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default TagModal;
