import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import app from "../firebaseApp";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";

const db = getFirestore(app);
const Item = ({ onClose, show }) => {
    const nameRef = useRef(null);
    const [name, setName] = useState("");
    const [stockUnit, setStockUnit] = useState("");
    const [ingredientUnit, setIngredientUnit] = useState("");
    const [conversionQuantity, setConversionQuantity] = useState("");
    const [openingStock, setOpeningStock] = useState("");

    const [cost, setCost] = useState("");
    const [minLevel, setMinLevel] = useState("");
    const [reorderLevel, setReorderLevel] = useState("");

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    const handleSave = async () => {
        const newItemRef = doc(collection(db, "items"));
        await setDoc(newItemRef, {
            name,
            stockUnit,
            ingredientUnit,
            conversionQuantity,
            openingStock: openingStock * conversionQuantity,
        });
        /* dispatch(
            addItem({ name, stockUnit, ingredientUnit, conversionQuantity })
        ); */
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    return (
        <Modal
            show={show}
            title="Create Item"
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div>
                <label className="font-light text-slate-600 text-sm">
                    Name
                </label>
                <input
                    ref={nameRef}
                    type="text"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex mt-2">
                <div className="flex-1 mr-1">
                    <label className="font-light text-slate-600 text-sm">
                        Stock Unit
                    </label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        placeholder="eg: KG"
                        value={stockUnit}
                        onChange={(e) => setStockUnit(e.target.value)}
                    />
                </div>
                <div className="ml-1 flex-1">
                    <label className="font-light text-slate-600 text-sm">
                        Ingredient Unit
                    </label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        placeholder="eg: GM"
                        value={ingredientUnit}
                        onChange={(e) => setIngredientUnit(e.target.value)}
                    />
                </div>
            </div>
            {stockUnit && ingredientUnit && (
                <div className="mt-2">
                    <h5 className="text-sm font-light">Conversion</h5>
                    <div className="mt-2 flex items-center text-slate-600">
                        <strong>1</strong>
                        <span className="ml-1">{stockUnit}</span>
                        <span className="mx-4">=</span>
                        <input
                            type="number"
                            value={conversionQuantity}
                            onChange={(e) =>
                                setConversionQuantity(e.target.value)
                            }
                            className="w-20 p-1 rounded border border-slate-200"
                        />
                        <span className="ml-1">{ingredientUnit}</span>
                    </div>
                </div>
            )}
            <div className="mt-2">
                <label className="font-light text-slate-600 text-sm">
                    Opening Stock {stockUnit && `(${stockUnit})`}
                </label>
                <input
                    type="number"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={openingStock}
                    onChange={(e) => setOpeningStock(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default Item;
