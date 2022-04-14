import { useEffect, useRef, useState } from "react";
import { getTaxGroups } from "./services/taxesService";
import TaxGroupModal from "./TaxGroupModal";

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
            <div className="text-slate-600 text-sm flex flex-wrap">
                {taxes.map((tax) => (
                    <div className="px-2 py-1 border border-teal-500 mr-2 rounded-lg">
                        {tax.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

const TaxesGroup = () => {
    const [showModal, toggleModal] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [selectedTaxes, setSelectedTaxes] = useState("");
    const [taxGroups, setTaxGroups] = useState([]);
    const [taxes, setTaxes] = useState([]);

    useEffect(() => {
        getTaxGroups().then((response) => {
            const { taxGroups } = response.data;
            console.log(taxGroups);
            setTaxGroups(taxGroups);
        });
    }, []);

    const handleCreateTaxGroup = () => {
        setId("");
        setName("");
        setSelectedTaxes([]);
        toggleModal(true);
    };

    const handleItemClick = ({ id, name, taxes }) => {
        setId(id);
        setName(name);
        setSelectedTaxes(taxes);
        toggleModal(true);
    };

    const resetData = () => {
        toggleModal(false);
        setId("");
        setName("");
        setSelectedTaxes([]);
    };

    const handleSave = (taxGroup) => {
        if (id) {
            setTaxGroups(
                taxGroups.map((t) => {
                    if (t.id === id) {
                        return taxGroup;
                    }
                    return t;
                })
            );
        } else {
            setTaxGroups([...taxGroups, taxGroup]);
        }

        resetData();
    };

    const handleCancel = () => {
        resetData();
    };

    const handleDelete = (id) => {
        setTaxGroups(taxGroups.filter((t) => t.id !== id));
        resetData();
    };

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
                {taxGroups.map((taxGroup, idx) => {
                    return (
                        <TaxGroupButton
                            key={`tax-group-${idx}`}
                            {...taxGroup}
                            onItemClick={handleItemClick}
                        />
                    );
                })}
            </div>

            <TaxGroupModal
                id={id}
                show={showModal}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default TaxesGroup;
