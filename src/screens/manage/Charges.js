import ChargesModal from "./ChargesModal";
import { useEffect, useState } from "react";
import {
    getCharges,
    createCharge,
    updateCharge,
    deleteCharge,
} from "./services/chargesService";
import Page from "../Page";

const Charges = () => {
    const [charges, setCharges] = useState([]);
    const [showModal, toggleModal] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        getCharges().then((response) => {
            const { charges } = response.data;
            setCharges(charges);
        });
    }, []);

    const handleDelete = () => {
        deleteCharge(id).then((response) => {
            if (response.status === 204) {
                setCharges(charges.filter((p) => p.id !== id));
                resetData();
            }
        });
    };

    const resetData = () => {
        toggleModal(false);
        setId("");
    };

    const handleSave = (charge) => {
        if (id) {
            setCharges(
                charges.map((c) => {
                    if (c.id === id) {
                        return charge;
                    }
                    return c;
                })
            );
        } else {
            setCharges([...charges, charge]);
        }
        resetData();
    };

    const handleCancel = () => {
        resetData();
    };

    const handleCreateCharge = () => {
        setId("");
        toggleModal(true);
    };

    const handleItemClick = (item) => {
        setId(item.id);
        toggleModal(true);
    };

    return (
        <Page
            back
            title="Charges"
            actions={
                <>
                    <button
                        onClick={handleCreateCharge}
                        className="font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Create Charge
                    </button>
                </>
            }
        >
            <div className="h-full mt-10 p-10 text-slate-600">
                <div className="flex flex-wrap">
                    {charges.map((p, idx) => {
                        return (
                            <div
                                key={`charge-${idx}`}
                                onClick={() => handleItemClick(p)}
                                className="w-1/5 mr-6 mb-6 bg-white rounded-lg p-4 border border-transparent hover:border-teal-500 transition shadow hover:shadow-lg cursor-pointer"
                            >
                                <h3 className="text-xl">{p.name}</h3>
                                <div className="flex items-center mt-4">
                                    <span className="font-light text-sm">
                                        {p.type === "Amount" && "SAR "}
                                        {p.value}
                                        {p.type === "Percentage" && " %"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ChargesModal
                id={id}
                show={showModal}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
            />
        </Page>
    );
};

export default Charges;
