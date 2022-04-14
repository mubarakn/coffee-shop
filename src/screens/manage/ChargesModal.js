import { useRef, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Label from "../../components/Label";
import Dropdown from "../../components/Dropdown";
import {
    getCharge,
    createCharge,
    deleteCharge,
    updateCharge,
} from "./services/chargesService";
import Input from "../../components/Input";
import { getSettings } from "./services/settingsService";
import { getBranches } from "./services/branchesService";
import { getTaxGroups } from "./services/taxesService";

const ChargesModal = ({ id, show, onSave, onCancel, onDelete }) => {
    const nameRef = useRef(null);
    const types = ["Amount", "Percentage"];
    const [name, setName] = useState("");
    const [type, setType] = useState(types[0]);
    const [value, setValue] = useState("");
    const [cashierCanChange, toggleCashierCanChange] = useState(false);
    const [orderTypes, setOrderTypes] = useState([]);
    const [branches, setBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [taxGroups, setTaxGroups] = useState([]);
    const [taxGroup, setTaxGroup] = useState(null);
    const [autoApply, toggleAutoApply] = useState(false);
    const currency = localStorage.getItem("currency");

    useEffect(() => {
        if (show) {
            nameRef.current.focus();

            getBranches().then((response) => {
                setBranches(response.data.branches);
            });

            getTaxGroups().then((response) => {
                setTaxGroups(response.data.taxGroups);
            });
        } else {
            setName("");
            setType(types[0]);
            setValue("");
            toggleCashierCanChange(false);
            setOrderTypes([]);
            setSelectedBranches([]);
            setTaxGroup(null);
            toggleAutoApply(false);
        }
    }, [show]);

    useEffect(() => {
        if (show && id) {
            getCharge(id).then((response) => {
                const charge = response.data;
                setName(charge.name);
                setType(charge.type);
                setValue(charge.value);
                toggleCashierCanChange(charge.cashierCanChange);
                setOrderTypes(charge.orderTyeps);
                setSelectedBranches(charge.branches);
                setTaxGroup(charge.taxGroup);
                toggleAutoApply(charge.autoApply);
            });
        }
    }, [show, id]);

    const handleSave = () => {
        if (!id) {
            createCharge(
                name,
                type,
                value,
                cashierCanChange,
                orderTypes,
                branches,
                taxGroup,
                autoApply
            ).then((response) => {
                response.status === 201 &&
                    typeof onSave === "function" &&
                    onSave(response.data);
            });
        } else {
            updateCharge(
                id,
                name,
                type,
                value,
                cashierCanChange,
                orderTypes,
                selectedBranches,
                taxGroup,
                autoApply
            ).then((response) => {
                response.status === 202 &&
                    typeof onSave === "function" &&
                    onSave({
                        id,
                        name,
                        type,
                        value,
                        cashierCanChange,
                        orderTypes,
                        branches: selectedBranches,
                        taxGroup,
                        autoApply,
                    });
            });
        }
    };

    const handleCancel = () => {
        typeof onCancel === "function" && onCancel();
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure, you want to delete this Charge?")) {
            deleteCharge(id).then((response) => {
                response.status === 204 &&
                    typeof onDelete === "function" &&
                    onDelete(id);
            });
        }
    };

    return (
        <Modal
            title={`${id ? "Edit" : "Create"} Charge`}
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Charge"}
        >
            <div>
                <Label className="mb-1">Name</Label>
                <Input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={setName}
                    className="!bg-white"
                />
            </div>
            <div className="mt-4">
                <Label className="mb-1">Type</Label>
                <select
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded text-slate-600 font-light py-1 px-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    {types.map((t) => (
                        <option key={`type-${t}`} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                <Label className="mb-1">
                    Value ({type === "Amount" ? currency : "%"})
                </Label>
                <input
                    type="text"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <Label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={cashierCanChange}
                        onChange={() =>
                            toggleCashierCanChange(!cashierCanChange)
                        }
                    />
                    <span className="ml-2">Cashier Can Change</span>
                </Label>
            </div>
            <div className="mt-4">
                <Label>Apply On Order Types</Label>
                <Dropdown
                    multiple
                    data={["Dine In", "Pick Up", "Delivery", "Drive Thru"].map(
                        (d) => ({ label: d, value: d })
                    )}
                    selectedValue={orderTypes}
                    onOptionSelected={(orderType) =>
                        setOrderTypes([...orderTypes, orderType.value])
                    }
                />
            </div>
            <div className="mt-4">
                <Label>Branches</Label>
                <Dropdown
                    multiple
                    data={branches.map((b) => ({ label: b.name, value: b.id }))}
                    selectedValue={selectedBranches}
                    onOptionSelected={(branch) =>
                        setSelectedBranches([...selectedBranches, branch.id])
                    }
                />
            </div>
            <div className="mt-4">
                <Label>Tax Group</Label>
                <Dropdown
                    data={taxGroups.map((t) => ({
                        label: t.name,
                        value: t.id,
                    }))}
                    selectedValue={taxGroup}
                    onOptionSelected={(item) => setTaxGroup(item.value)}
                />
            </div>
            <div className="mt-4">
                <Label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={autoApply}
                        onChange={() => toggleAutoApply(!autoApply)}
                    />
                    <span className="ml-2">Auto Apply</span>
                </Label>
            </div>
        </Modal>
    );
};

export default ChargesModal;
