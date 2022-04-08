import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Label from "../../components/Label";
import {
    getTaxes,
    createTax,
    updateTax,
    deleteTax,
    getTaxGroups,
    createTaxGroup,
    updateTaxGroup,
    deleteTaxGroup,
} from "./services/taxesService";
import Dropdown from "../../components/Dropdown";

const TaxModal = ({
    title,
    show,
    name,
    onNameChange,
    rate,
    onRateChange,
    onSave,
    onCancel,
    onDelete,
    deleteText,
}) => {
    const nameRef = useRef(null);

    useEffect(() => {
        if (show) {
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
            <div>
                <Label>Name</Label>
                <input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                />
            </div>
            <div className="mt-4">
                <Label>Rate (%)</Label>
                <input
                    type="number"
                    value={rate}
                    onChange={(e) => onRateChange(e.target.value)}
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                />
            </div>
        </Modal>
    );
};

const TaxButton = ({ id, name, rate, onItemClick }) => {
    return (
        <div
            onClick={() =>
                typeof onItemClick === "function" &&
                onItemClick({ id, name, rate })
            }
            className="bg-white p-4 w-1/5 mr-4 mb-4 rounded-lg border border-transparent hover:border-teal-500 transition shadow hover:shadow-lg cursor-pointer"
        >
            <h4 className="mb-2">{name}</h4>
            <span className="text-slate-600">{rate}%</span>
        </div>
    );
};

const Taxes = () => {
    const navigate = useNavigate();
    const hasHistory = window.history.length > 0;

    const [showTaxModal, toggleTaxModal] = useState(false);
    const [taxes, setTaxes] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [rate, setRate] = useState("");

    useEffect(() => {
        getTaxes().then((response) => {
            const { taxes } = response.data;
            setTaxes(taxes);
        });
    }, []);

    const resetData = () => {
        toggleTaxModal(false);
        setId("");
        setName("");
        setRate("");
    };

    const handleSave = () => {
        if (id) {
            updateTax(id, name, rate).then((response) => {
                setTaxes(
                    taxes.map((t) => {
                        if (t.id === id) {
                            t.name = name;
                            t.rate = rate;
                        }
                        return t;
                    })
                );
                resetData();
            });
        } else {
            createTax(name, rate).then((response) => {
                const { id, name, rate } = response.data;
                setTaxes([...taxes, { id, name, rate }]);
                resetData();
            });
        }
    };

    const handleCancel = () => {
        resetData();
    };

    const handleDelete = () => {
        deleteTax(id).then((response) => {
            setTaxes(taxes.filter((t) => t.id !== id));
            resetData();
        });
    };

    const handleItemClick = ({ id, name, rate }) => {
        setId(id);
        setName(name);
        setRate(rate);
        toggleTaxModal(true);
    };

    const handleCreateTax = () => {
        setId("");
        setName("");
        setRate("");
        toggleTaxModal(true);
    };

    return (
        <div className="w-full h-full">
            <div className="bg-white px-10 py-2">
                {hasHistory && (
                    <button
                        className="flex items-center text-slate-600 hover:text-slate-700"
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineLeft className="mr-1" />
                        <span className="font-light">Back</span>
                    </button>
                )}
                <h1 className="text-3xl font-light">Taxes &amp; Groups</h1>
            </div>
            <div className="h-full mt-10 items-center p-10">
                <div className="mb-10">
                    <div className="flex items-center">
                        <h2 className="text-2xl font-light text-slate-600 mb-4">
                            Taxes
                        </h2>
                        <button
                            onClick={handleCreateTax}
                            className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                        >
                            Create Tax
                        </button>
                    </div>
                    <div className="w-full flex flex-wrap">
                        {taxes.map((tax) => (
                            <TaxButton {...tax} onItemClick={handleItemClick} />
                        ))}
                    </div>
                </div>

                <TaxesGroup taxes={taxes} />
            </div>

            <TaxModal
                title={"Create Tax"}
                show={showTaxModal}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
                name={name}
                rate={rate}
                onNameChange={setName}
                onRateChange={setRate}
                deleteText={id && "Delete Tax"}
            />
        </div>
    );
};

const TaxGroupModal = ({
    title,
    show,
    onSave,
    onCancel,
    onDelete,
    name,
    taxes,
    onNameChange,
    onTaxesChange,
}) => {
    const nameRef = useRef(null);

    useEffect(() => {
        if (show) {
            // nameRef.current.focus();
        }
    }, [show]);

    return (
        <Modal
            title={title}
            show={show}
            onSave={onSave}
            onCancel={onCancel}
            onDelete={onDelete}
        >
            <div>
                <Label>Name</Label>
                <input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                />
            </div>
            <div className="mt-4">
                <Label>Taxes</Label>
                <Dropdown
                    data={taxes}
                    onOptionSelected={onTaxesChange}
                    multiple
                />
            </div>
        </Modal>
    );
};

const TaxGroupButton = ({ id, name, taxes, onItemClick }) => {
    return (
        <div
            onClick={() =>
                typeof onItemClick === "function" &&
                onItemClick({ id, name, taxes })
            }
            className="bg-white p-4 w-1/5 mr-4 mb-4 rounded-lg border border-transparent hover:border-teal-500 transition shadow hover:shadow-lg cursor-pointer"
        >
            <h4 className="mb-2">{name}</h4>
            <span className="text-slate-600">Taxes here</span>
        </div>
    );
};

const TaxesGroup = ({ taxes }) => {
    const [showModal, toggleModal] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [selectedTaxes, setSelectedTaxes] = useState("");
    const [taxGroups, setTaxGroups] = useState([]);

    useEffect(() => {
        getTaxGroups().then((response) => {
            const { taxGroups } = response.data;
            setTaxGroups(taxGroups);
        });
    }, []);

    const handleCreateTaxGroup = () => {
        setId("");
        setName("");
        setSelectedTaxes([]);
        toggleModal(true);
    };

    const handleItemClick = ({ id, name, rate }) => {
        setId(id);
        setName(name);
        toggleModal(true);
    };

    const handleSave = () => {
        console.log(name, selectedTaxes);
        createTaxGroup(
            name,
            selectedTaxes.map((t) => t.value)
        ).then((response) => {
            console.log(response);

            toggleModal(false);
            setId("");
            setName("");
            setSelectedTaxes([]);
        });
    };

    const handleCancel = () => {
        toggleModal(false);
        setId("");
        setName("");
        setSelectedTaxes([]);
    };

    const handleTaxesChange = (tax) => {
        setSelectedTaxes([...selectedTaxes, tax]);
    };

    const handleDelete = () => {};

    return (
        <div>
            <div className="flex items-center">
                <h2 className="text-2xl font-light text-slate-600 mb-4">
                    Tax Groups
                </h2>
                <button
                    onClick={handleCreateTaxGroup}
                    className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                >
                    Create Tax Group
                </button>
            </div>
            <div className="w-full flex flex-wrap">
                {taxGroups.map((taxGroup) => (
                    <TaxGroupButton
                        {...taxGroup}
                        onItemClick={handleItemClick}
                    />
                ))}
            </div>

            <TaxGroupModal
                title={"Create Tax Group"}
                show={showModal}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
                name={name}
                onTaxesChange={handleTaxesChange}
                onNameChange={setName}
                deleteText={id && "Delete Tax Group"}
                taxes={taxes.map((t) => ({ label: t.name, value: t.id }))}
            />
        </div>
    );
};

export default Taxes;
