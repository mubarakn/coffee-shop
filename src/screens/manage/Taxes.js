import { useState, useEffect } from "react";
import { getTaxes } from "./services/taxesService";
import TaxModal from "./TaxModal";

const Taxes = () => {
    const [showTaxModal, toggleTaxModal] = useState(false);
    const [taxes, setTaxes] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        getTaxes().then((response) => {
            const { taxes } = response.data;
            setTaxes(taxes);
        });
    }, []);

    const handleItemClick = (id) => {
        setId(id);
        toggleTaxModal(true);
    };

    const resetData = () => {
        setId("");
        toggleTaxModal(false);
    };

    const handleCreateTax = () => {
        setId("");
        toggleTaxModal(true);
    };

    const handleSave = (tax) => {
        if (id) {
            setTaxes(
                taxes.map((t) => {
                    if (t.id === tax.id) {
                        return tax;
                    }
                    return t;
                })
            );
        } else {
            setTaxes([...taxes, tax]);
        }
        resetData();
    };

    const handleCancel = () => {
        resetData();
    };

    const handleDelete = (id) => {
        setTaxes(taxes.filter((t) => t.id !== id));
        resetData();
    };

    return (
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
                {taxes.map((tax, idx) => (
                    <div
                        key={`tax-${tax.id}`}
                        onClick={() => handleItemClick(tax.id)}
                        className="bg-white p-4 w-1/5 mr-4 mb-4 rounded-lg border border-transparent hover:border-teal-500 transition shadow hover:shadow-lg cursor-pointer"
                    >
                        <h4 className="mb-2">{tax.name}</h4>
                        <span className="text-slate-600">{tax.rate}%</span>
                    </div>
                ))}
            </div>
            <TaxModal
                id={id}
                show={showTaxModal}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default Taxes;
