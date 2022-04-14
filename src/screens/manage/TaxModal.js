import { useRef, useState, useEffect } from "react";
import {
    createTax,
    deleteTax,
    getTax,
    updateTax,
} from "./services/taxesService";

import Modal from "../../components/Modal";
import Label from "../../components/Label";
import Input from "../../components/Input";

const TaxModal = ({ id, show, onSave, onCancel, onDelete }) => {
    const nameRef = useRef(null);
    const [name, setName] = useState("");
    const [rate, setRate] = useState("");

    useEffect(() => {
        if (show) {
            nameRef.current.focus();
            setName("");
            setRate("");
        }
    }, [show]);

    useEffect(() => {
        if (id && show) {
            getTax(id).then((response) => {
                setName(response.data.name);
                setRate(response.data.rate);
            });
        }
    }, [id, show]);

    const handleSave = () => {
        if (id) {
            updateTax(id, name, rate).then((response) => {
                if (response.status === 202 && typeof onSave === "function") {
                    onSave({ id, name, rate });
                }
            });
        } else {
            createTax(name, rate).then((response) => {
                if (response.status === 201 && typeof onSave === "function") {
                    const { id, name, rate } = response.data;
                    onSave({ id, name, rate });
                }
            });
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure, you want to delete this Tax?")) {
            deleteTax(id).then((response) => {
                if (response.status === 204) {
                    onDelete(id);
                }
            });
        }
    };

    return (
        <Modal
            title={`${id ? "Edit" : "Create"} Tax`}
            show={show}
            onSave={handleSave}
            onCancel={onCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Tax"}
        >
            <div>
                <Label>Name</Label>
                <Input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={setName}
                    className="!bg-white"
                />
            </div>
            <div className="mt-4">
                <Label>Rate (%)</Label>
                <Input
                    type="number"
                    value={rate}
                    onChange={setRate}
                    className="!bg-white"
                />
            </div>
        </Modal>
    );
};

export default TaxModal;
