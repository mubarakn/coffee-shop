import Modal from "./Modal";
import Label from "./Label";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    getDevice,
    deleteDevice,
    updateDevice,
    createDevice,
    getCode,
} from "../screens/manage/services/devicesService";
import Dropdown from "./Dropdown";
import { getBranches } from "../screens/manage/services/branchesService";
import Input from "./Input";

const deviceCodes = {
    Cashier: "C",
    KDS: "K",
    Notifier: "N",
    Display: "D",
    "Sub Cashier": "S",
};
const types = ["Cashier", "KDS", "Notifier", "Display", "Sub Cashier"];

const DeviceModal = ({ show, id, onSave, onCancel, onDelete }) => {
    const codeRef = useRef(null);
    const [branches, setBranches] = useState([]);
    const [type, setType] = useState(types[0]);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [branch, setBranch] = useState(null);
    const [menuGroup, setMenuGroup] = useState("");
    const [receivesOnlineOrders, setReceivesOnlineOrders] = useState(false);

    useEffect(() => {
        getBranches().then((response) => {
            const { branches } = response.data;
            setBranches(branches);
        });
    }, []);

    useEffect(() => {
        if (id) {
            getDevice(id).then((response) => {
                // console.log(response.data);
            });
        }
    }, [id]);

    const getCodeFromServer = () => {
        getCode(type).then((response) => {
            setCode(
                `${deviceCodes[type]}${String(response.data).padStart(2, "0")}`
            );
        });
    };

    useEffect(() => {
        if (!id) {
            getCodeFromServer();
        }
    }, [type, id]);

    const handleGenerate = () => {
        getCodeFromServer();
    };

    const resetData = () => {
        setCode("");
        setName("");
        setBranch(null);
        setMenuGroup(null);
        setReceivesOnlineOrders(false);
    };

    useEffect(() => {
        if (show) {
            codeRef.current.focus();
        }
    }, [show]);

    useEffect(() => {
        if (id) {
            getDevice(id).then((response) => {
                const device = response.data;
                setCode(device.code);
                setName(device.name);
                setBranch(device.branch);
                setMenuGroup(device.menuGroup);
                setReceivesOnlineOrders(device.receivesOnlineOrders);
            });
        }
    }, [id]);

    const handleBranchSelected = (branch) => {
        setBranch(branch.value);
    };

    const triggerSave = () => {
        if (typeof onSave === "function") {
            onSave({
                id,
                type,
                code,
                name,
                branch,
                menuGroup,
                receivesOnlineOrders,
            });
        }
        resetData();
    };

    const handleSave = () => {
        if (id) {
            updateDevice(
                id,
                code,
                name,
                branch,
                menuGroup,
                receivesOnlineOrders
            ).then((response) => {
                if (response.status === 202) {
                    triggerSave();
                }
            });
        } else {
            createDevice(type, code, name, branch).then((response) => {
                if (response.status === 201) {
                    onSave({
                        ...response.data,
                        menuGroup,
                        receivesOnlineOrders,
                    });
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
            title={id ? "Edit Device" : "New Device"}
            onSave={handleSave}
            onCancel={handleCancel}
            deleteText={id && "Delete Device"}
        >
            {!id && (
                <div className="mb-4">
                    <Label>Type</Label>
                    <select
                        ref={codeRef}
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="mb-4">
                <Label className="mb-1">Code</Label>
                <div className="flex items-stretch">
                    <Input
                        ref={codeRef}
                        type="text"
                        value={code}
                        onChange={setCode}
                    />
                    <button
                        className="ml-4 text-slate-500 hover:text-black transition bg-white border border-slate-300 px-4 py-1 rounded font-light"
                        onClick={handleGenerate}
                    >
                        Generate
                    </button>
                </div>
            </div>
            <div className="mb-4">
                <Label className="mb-1">Name</Label>
                <Input value={name} onChange={setName} />
            </div>
            <div className="mb-4">
                <Label>Branch</Label>
                <Dropdown
                    data={branches.map((b) => ({
                        label: b.name,
                        value: b.id,
                    }))}
                    selectedValue={branch}
                    onOptionSelected={handleBranchSelected}
                />
            </div>
        </Modal>
    );
};

export default DeviceModal;
