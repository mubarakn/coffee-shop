import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

const AssignIngredient = ({ show, ingredients, onAdd, onClose }) => {
    const items = useSelector((state) => state.items);
    const [ingredient, setIngredient] = useState("");

    if (!show) {
        return null;
    }

    const handleSave = () => {
        if (typeof onAdd === "function") {
            onAdd(ingredient);
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    return (
        <Modal
            title="Select Ingredient"
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div className="flex items-center">
                <select
                    className="p-1 border border-slate-200 rounded w-full"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                >
                    <option value="">Select</option>
                    {items
                        .filter((item) => !ingredients.includes(item.id))
                        .map((item) => (
                            <option key={`item-${item.id}`} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>
        </Modal>
    );
};

export default AssignIngredient;
