import Modal from "../../components/Modal";
import Label from "../../components/Label";
import { useEffect, useRef, useState } from "react";
import {
    getPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
} from "./services/paymentMethodsService";
import Page from "../Page";

const PaymentMethods = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [showModal, toggleModal] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("Cash");
    const [autoOpenCashDrawer, setAutoOpenCashDrawer] = useState(false);
    const [active, setActive] = useState(true);

    useEffect(() => {
        getPaymentMethods().then((response) => {
            const { paymentMethods } = response.data;
            setPaymentMethods(paymentMethods);
        });
    }, []);

    const handleDelete = () => {
        deletePaymentMethod(id).then((response) => {
            if (response.status === 204) {
                setPaymentMethods(paymentMethods.filter((p) => p.id !== id));
                resetData();
            }
        });
    };

    const resetData = () => {
        toggleModal(false);
        setId("");
        setName("");
        setType("Cash");
        setAutoOpenCashDrawer(false);
        setActive(true);
    };

    const handleSave = () => {
        if (id) {
            updatePaymentMethod(
                id,
                name,
                type,
                autoOpenCashDrawer,
                active
            ).then((response) => {
                if (response.status === 202) {
                    setPaymentMethods(
                        paymentMethods.map((p) => {
                            if (p.id === id) {
                                return {
                                    id,
                                    name,
                                    type,
                                    autoOpenCashDrawer,
                                    active,
                                };
                            }
                            return p;
                        })
                    );
                }
                resetData();
            });
        } else {
            createPaymentMethod(name, type, autoOpenCashDrawer, active).then(
                (response) => {
                    const { id, name, type, autoOpenCashDrawer, active } =
                        response.data;
                    setPaymentMethods([
                        ...paymentMethods,
                        { id, name, type, autoOpenCashDrawer, active },
                    ]);
                    resetData();
                }
            );
        }
    };

    const handleCancel = () => {
        resetData();
    };

    const handleCreatePaymentMethod = () => {
        resetData();
        toggleModal(true);
    };

    const handleItemClick = (item) => {
        setId(item.id);
        setName(item.name);
        setType(item.type);
        setAutoOpenCashDrawer(item.autoOpenCashDrawer);
        setActive(item.active);
        toggleModal(true);
    };

    return (
        <Page
            back
            title="Payment Methods"
            actions={
                <>
                    <button
                        onClick={handleCreatePaymentMethod}
                        className="font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Create Payment Method
                    </button>
                </>
            }
        >
            <div className="p-10 text-slate-600">
                <div className="flex flex-wrap">
                    {paymentMethods.map((p) => {
                        return (
                            <div
                                onClick={() => handleItemClick(p)}
                                className="w-1/5 mr-6 mb-6 bg-white rounded-lg p-4 border border-transparent hover:border-teal-500 transition shadow hover:shadow-lg cursor-pointer"
                            >
                                <h3 className="text-xl">{p.name}</h3>
                                <div className="flex items-center mt-4">
                                    <span className="font-light text-sm">
                                        {p.type}
                                    </span>
                                    <span
                                        className={`ml-auto px-4 py-1 rounded-lg ${
                                            p.active
                                                ? "text-teal-700 bg-teal-50"
                                                : "text-pink-700 bg-pink-50"
                                        }`}
                                    >
                                        {p.active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <PaymentMethodModal
                show={showModal}
                name={name}
                onNameChange={setName}
                type={type}
                onTypeChange={setType}
                autoOpenCashDrawer={autoOpenCashDrawer}
                onAutoOpenCashDrawerChange={(value) =>
                    setAutoOpenCashDrawer(value)
                }
                active={active}
                onActiveChange={(value) => setActive(value)}
                deleteText={id && "Delete Payment Method"}
                onDelete={handleDelete}
                onSave={handleSave}
                onCancel={handleCancel}
                title={id ? "Edit Payment Method" : "Create Payment Method"}
            />
        </Page>
    );
};

export default PaymentMethods;

const PaymentMethodModal = ({
    title,
    show,
    onSave,
    onCancel,
    onDelete,
    deleteText,
    name,
    onNameChange,
    type,
    onTypeChange,
    autoOpenCashDrawer,
    onAutoOpenCashDrawerChange,
    active,
    onActiveChange,
}) => {
    const nameRef = useRef(null);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, [show]);

    return (
        <Modal
            title={title}
            show={show}
            onSave={onSave}
            onCancel={onCancel}
            onDelete={onDelete}
            deleteText={deleteText}
        >
            <>
                <div>
                    <Label>Name</Label>
                    <input
                        ref={nameRef}
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <Label>Type</Label>
                    <select
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded text-slate-600 font-light py-1 px-2"
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value)}
                    >
                        {["Cash", "Card", "Other"].map((t) => (
                            <option key={`payment-type-${t}`} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <Label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={autoOpenCashDrawer}
                            onChange={() =>
                                typeof onAutoOpenCashDrawerChange ===
                                    "function" &&
                                onAutoOpenCashDrawerChange(!autoOpenCashDrawer)
                            }
                        />
                        <span className="ml-2">Auto Open Cash Drawer</span>
                    </Label>
                </div>
                <div className="mt-4">
                    <Label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={() =>
                                typeof onActiveChange === "function" &&
                                onActiveChange(!active)
                            }
                        />
                        <span className="ml-2">Active</span>
                    </Label>
                </div>
            </>
        </Modal>
    );
};
