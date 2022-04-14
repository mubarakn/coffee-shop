import Modal from "./Modal";
import Label from "./Label";
import { useEffect, useRef, useState } from "react";
import {
    getBranch,
    deleteBranch,
    updateBranch,
    createBranch,
} from "../screens/manage/services/branchesService";
import { getTaxGroups } from "../screens/manage/services/taxesService";
import Dropdown from "./Dropdown";

const BranchModal = ({ show, id, onSave, onCancel, onDelete }) => {
    const codeRef = useRef(null);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [taxGroups, setTaxGroups] = useState([]);
    const [selectedTaxGroups, setSelectedTaxGroups] = useState([]);
    const [taxRegistrationName, setTaxRegistrationName] = useState("");
    const [taxNumber, setTaxNumber] = useState("");
    const [openingTime, setOpeningTime] = useState("");
    const [closingTime, setClosingTime] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [receiptHeader, setReceiptHeader] = useState("");
    const [receiptFooter, setReceiptFooter] = useState("");

    const resetData = () => {
        setCode("");
        setName("");
        setCountry("");
        setSelectedTaxGroups([]);
        setTaxRegistrationName("");
        setTaxNumber("");
        setOpeningTime("");
        setClosingTime("");
        setPhone("");
        setAddress("");
        setLatitude("");
        setLongitude("");
        setReceiptHeader("");
        setReceiptFooter("");
    };

    useEffect(() => {
        if (show) {
            codeRef.current.focus();
        }
    }, [show]);

    useEffect(() => {
        getTaxGroups().then((response) => {
            const { taxGroups } = response.data;
            setTaxGroups(taxGroups);
        });
    }, []);

    const handleDelete = () => {
        deleteBranch(id).then((response) => {
            if (response.status === 204) {
                if (typeof onDelete === "function") {
                    onDelete();
                }
            }
        });
    };

    useEffect(() => {
        if (id) {
            getBranch(id).then((response) => {
                const branch = response.data;
                setCode(branch.code);
                setName(branch.name);
                setCountry(branch.country);
                setSelectedTaxGroups(branch.taxGroups);
                setTaxRegistrationName(branch.taxRegistrationName);
                setTaxNumber(branch.taxNumber);
                setOpeningTime(branch.openingTime);
                setClosingTime(branch.closingTime);
                setPhone(branch.phone);
                setAddress(branch.address);
                setLatitude(branch.latitude);
                setLongitude(branch.longitude);
                setReceiptHeader(branch.receiptHeader);
                setReceiptFooter(branch.receiptFooter);
            });
        }
    }, [id]);

    const handleTaxGroupRemoved = (taxGroup) => {
        setSelectedTaxGroups(selectedTaxGroups.filter((s) => s !== taxGroup));
    };

    const handleTaxGroupSelected = (taxGroup) => {
        setSelectedTaxGroups([...selectedTaxGroups, taxGroup.value]);
    };

    const triggerSave = () => {
        if (typeof onSave === "function") {
            onSave({
                id,
                code,
                name,
                country,
                taxGroups: selectedTaxGroups,
                taxRegistrationName,
                taxNumber,
                openingTime,
                closingTime,
                phone,
                address,
                latitude,
                longitude,
                receiptHeader,
                receiptFooter,
            });
        }
        resetData();
    };

    const handleSave = () => {
        if (id) {
            updateBranch(
                id,
                code,
                name,
                country,
                selectedTaxGroups,
                taxRegistrationName,
                taxNumber,
                openingTime,
                closingTime,
                phone,
                address,
                latitude,
                longitude,
                receiptHeader,
                receiptFooter
            ).then((response) => {
                if (response.status === 202) {
                    triggerSave();
                }
            });
        } else {
            createBranch(
                code,
                name,
                country,
                selectedTaxGroups,
                taxRegistrationName,
                taxNumber,
                openingTime,
                closingTime,
                phone,
                address,
                latitude,
                longitude,
                receiptHeader,
                receiptFooter
            ).then((response) => {
                if (response.status === 201) {
                    triggerSave();
                }
            });
        }
    };

    const handleCancel = () => {
        resetData();
        if (typeof onCancel === "function") {
            onCancel();
        }
    };

    return (
        <Modal
            show={show}
            title={id ? "Edit Branch" : "Create Branch"}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Branch"}
        >
            <div className="max-h-[70vh] overflow-y-scroll">
                <div className="mb-4">
                    <Label>Code</Label>
                    <input
                        ref={codeRef}
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Name</Label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Tax Groups</Label>
                    <Dropdown
                        multiple
                        data={taxGroups.map((t) => ({
                            label: t.name,
                            value: t.id,
                        }))}
                        selectedValue={selectedTaxGroups}
                        onOptionRemoved={handleTaxGroupRemoved}
                        onOptionSelected={handleTaxGroupSelected}
                    />
                </div>
                <div className="mb-4">
                    <Label>Branch Tax Registeration Name</Label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={taxRegistrationName}
                        onChange={(e) => setTaxRegistrationName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Branch Tax Number</Label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Opening Time</Label>
                    <input
                        type="time"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={openingTime}
                        onChange={(e) => setOpeningTime(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Closing Time</Label>
                    <input
                        type="time"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={closingTime}
                        onChange={(e) => setClosingTime(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Phone</Label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Address</Label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Latitude</Label>
                    <input
                        type="number"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Longitude</Label>
                    <input
                        type="number"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Receipt Header</Label>
                    <textarea
                        rows={3}
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={receiptHeader}
                        onChange={(e) => setReceiptHeader(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Receipt Footer</Label>
                    <textarea
                        rows={3}
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={receiptFooter}
                        onChange={(e) => setReceiptFooter(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default BranchModal;
