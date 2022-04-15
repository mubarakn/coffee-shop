import { useEffect, useState, useRef } from "react";
import {
    deleteTaxGroup,
    getTaxes,
    updateTaxGroup,
    createTaxGroup,
    getTaxGroup,
} from "./services/taxesService";

import Modal from "../../components/Modal";
import Label from "../../components/Label";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";

const TaxGroupModal = ({ id, show, onSave, onCancel, onDelete }) => {
    const nameRef = useRef(null);
    const [name, setName] = useState("");
    const [taxes, setTaxes] = useState([]);
    const [selectedTaxes, setSelectedTaxes] = useState([]);

    useEffect(() => {
        if (show) {
            nameRef.current.focus();

            getTaxes().then((response) => {
                setTaxes(response.data.taxes);
            });
        } else {
            setName("");
            setTaxes([]);
            setSelectedTaxes([]);
        }
    }, [show]);

    useEffect(() => {
        if (show && id) {
            getTaxGroup(id).then((response) => {
                setName(response.data.name);
                setSelectedTaxes(response.data.taxes);
            });
        }
    }, [show, id]);

    const handleTaxesChange = (option) => {
        setSelectedTaxes([...selectedTaxes, option.value]);
    };

    const handleTaxRemoved = (taxId) => {
        setSelectedTaxes(selectedTaxes.filter((id) => id !== taxId));
    };

    const handleDelete = () => {
        if (
            window.confirm("Are you sure, you want to delete this Tax Group?")
        ) {
            deleteTaxGroup(id).then((response) => {
                response.status === 204 &&
                    typeof onDelete === "function" &&
                    onDelete(id);
            });
        }
    };

    const handleCancel = () => {
        typeof onCancel === "function" && onCancel();
    };

    const handleSave = () => {
        if (id) {
            updateTaxGroup(id, name, selectedTaxes).then((response) => {
                response.status === 202 &&
                    typeof onSave === "function" &&
                    onSave({ id, name, selectedTaxes });
            });
        } else {
            createTaxGroup(name, selectedTaxes).then((response) => {
                response.status === 201 &&
                    typeof onSave === "function" &&
                    onSave(response.data);
            });
        }
    };

    return (
        <Modal
            title={`${id ? "Edit" : "Create"} Tax Group`}
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Tax Group"}
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
                <Label>Taxes</Label>
                <Dropdown
                    data={taxes.map((t) => ({ label: t.name, value: t.id }))}
                    selectedValue={selectedTaxes}
                    onOptionSelected={handleTaxesChange}
                    onOptionRemoved={handleTaxRemoved}
                    multiple
                />
            </div>
        </Modal>
    );
};

export default TaxGroupModal;
