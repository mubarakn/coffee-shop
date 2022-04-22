import { useEffect, useRef, useState } from "react";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import {
    createSupplier,
    updateSupplier,
    getSupplier,
    deleteSupplier,
} from "./supplierService";

const SupplierModal = ({ id, show, onClose, onSave, onDelete }) => {
    const codeRef = useRef(null);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [contactName, setContactName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (show) {
            codeRef.current.focus();
            if (id) {
                getSupplier(id).then((response) => {
                    const sup = response.data;
                    setCode(sup.code);
                    setName(sup.name);
                    setContactName(sup.contactName);
                    setPhone(sup.phone);
                    setEmail(sup.email);
                });
            }
        } else {
            setCode("");
            setName("");
            setContactName("");
            setPhone("");
            setEmail("");
        }
    }, [show]);

    const handleSave = async () => {
        if (id) {
            updateSupplier(id, code, name, contactName, phone, email).then(
                (response) => {
                    if (
                        response.status === 202 &&
                        typeof onSave === "function"
                    ) {
                        onSave({ id, code, name, contactName, phone, email });
                    }
                }
            );
        } else {
            createSupplier(code, name, contactName, phone, email).then(
                (response) => {
                    console.log(response);
                    const { id, tag } = response.data;
                    if (
                        response.status === 201 &&
                        typeof onSave === "function"
                    ) {
                        onSave({ id, code, name, contactName, phone, email });
                    }
                }
            );
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure, you want to delte this supplier?")) {
            deleteSupplier(id).then((response) => {
                if (response.status === 204 && typeof onDelete === "function") {
                    onDelete();
                }
            });
        }
    };

    return (
        <Modal
            title={`${id ? "Edit " : "Add "} Supplier`}
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Supplier"}
        >
            <div>
                <Label className="w-96">Code</Label>
                <Input
                    ref={codeRef}
                    type="text"
                    value={code}
                    onChange={setCode}
                />
            </div>
            <div className="mt-4">
                <Label>Name</Label>
                <Input type="text" value={name} onChange={setName} />
            </div>
            <div className="mt-4">
                <Label>Contact Name</Label>
                <Input
                    type="text"
                    value={contactName}
                    onChange={setContactName}
                />
            </div>
            <div className="mt-4">
                <Label>Phone</Label>
                <Input type="text" value={phone} onChange={setPhone} />
            </div>
            <div className="mt-4">
                <Label>Email</Label>
                <Input type="text" value={email} onChange={setEmail} />
            </div>
        </Modal>
    );
};

export default SupplierModal;
