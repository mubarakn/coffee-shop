import { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import {
    getCategory,
    deleteCategory,
    createCategory,
    updateCategory,
} from "./menuCategoryService";

const Category = ({ show, id, onSave, onClose, onDelete }) => {
    const nameRef = useRef(null);
    const [name, setName] = useState("");

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (show) {
            if (id) {
                getCategory(id).then((response) => {
                    setName(response.data.name);
                });
            }
        } else {
            setName("");
        }
    }, [show]);

    const handleSave = async () => {
        if (id) {
            //update
            updateCategory(id, name).then((response) => {
                if (response.status === 202) {
                    typeof onSave === "function" && onSave({ id, name });
                }
            });
        } else {
            //create
            createCategory(name).then((response) => {
                console.log(response);
                if (response.status === 201) {
                    typeof onSave === "function" &&
                        onSave({ ...response.data });
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
        deleteCategory(id).then((response) => {
            if (response.status === 204 && typeof onDelete === "function") {
                onDelete(id);
            }
        });
    };

    return (
        <Modal
            title={id ? "Edit Category" : "Create Category"}
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Category"}
        >
            <div className="w-96">
                <label className="font-light text-slate-600 text-sm">
                    Name
                </label>
                <input
                    ref={nameRef}
                    type="text"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default Category;
