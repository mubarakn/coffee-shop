import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import Label from "./Label";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { getCategories } from "../screens/inventory/categoryService";
import {
    createItem,
    deleteItem,
    getItem,
    updateItem,
} from "../screens/inventory/itemService";

const Item = ({ id, onClose, show, onSave, onDelete }) => {
    const nameRef = useRef(null);
    const [categories, setCategories] = useState([]);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState(null);
    const [stockUnit, setStockUnit] = useState("");
    const [ingredientUnit, setIngredientUnit] = useState("");
    const [conversionQuantity, setConversionQuantity] = useState("");
    const [barcode, setBarcode] = useState("");

    const [costingMethod, setCostingMethod] = useState("Fixed");
    const [cost, setCost] = useState("");
    const [minLevel, setMinLevel] = useState("");
    const [parLevel, setParLevel] = useState("");
    const [maxLevel, setMaxLevel] = useState("");

    useEffect(() => {
        if (show) {
            if (nameRef.current) {
                nameRef.current.focus();
            }

            getCategories().then((response) => {
                setCategories(response.data.categories);
            });

            getItem(id).then((response) => {
                const item = response.data;
                setCode(item.code);
                setName(item.name);
                setCategory(item.category.id);
                setStockUnit(item.stockUnit);
                setIngredientUnit(item.ingredientUnit);
                setConversionQuantity(item.conversionQuantity);
                setBarcode(item.barcode);
                setCostingMethod(item.costingMethod);
                setCost(item.cost);
                setMinLevel(item.minLevel);
                setParLevel(item.parLevel);
                setMaxLevel(item.maxLevel);
            });
        } else {
            setCode("");
            setName("");
            setCategory(null);
            setStockUnit("");
            setIngredientUnit("");
            setConversionQuantity("");
            setBarcode("");
            setCostingMethod("Fixed");
            setCost("");
            setMinLevel("");
            setParLevel("");
            setMaxLevel("");
        }
    }, [show]);

    const handleSave = async () => {
        if (id) {
            //update
            updateItem(
                id,
                code,
                name,
                category,
                stockUnit,
                ingredientUnit,
                conversionQuantity,
                barcode,
                costingMethod,
                cost,
                minLevel,
                parLevel,
                maxLevel
            ).then((response) => {
                if (response.status === 202) {
                    if (typeof onSave === "function") {
                        onSave({
                            id,
                            code,
                            name,
                            category,
                            stockUnit,
                            ingredientUnit,
                            conversionQuantity,
                            barcode,
                            costingMethod,
                            cost,
                            minLevel,
                            parLevel,
                            maxLevel,
                        });
                    }
                }
            });
        } else {
            //create
            createItem(
                code,
                name,
                category,
                stockUnit,
                ingredientUnit,
                conversionQuantity,
                barcode,
                costingMethod,
                cost,
                minLevel,
                parLevel,
                maxLevel
            ).then((response) => {
                if (response.status === 201) {
                    if (typeof onSave === "function") {
                        onSave(response.data);
                    }
                }
            });
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleDelete = () => {
        deleteItem(id).then((response) => {
            if (response.status === 204) {
                typeof onDelete === "function" && onDelete(id);
            }
        });
    };

    return (
        <Modal
            show={show}
            title="Create Item"
            onSave={handleSave}
            onCancel={handleCancel}
            deleteText={id && "Delete Item"}
            onDelete={handleDelete}
        >
            <div className="max-h-[75vh] overflow-y-scroll p-2">
                <div className="w-96">
                    <Label>Code</Label>
                    <Input
                        ref={nameRef}
                        type="text"
                        value={code}
                        onChange={setCode}
                    />
                </div>
                <div className="mt-4">
                    <Label>Name</Label>
                    <Input type="text" value={name} onChange={setName} />
                </div>
                <div className="mt-4">
                    <Label>Category</Label>
                    <Dropdown
                        data={categories.map((c) => ({
                            value: c.id,
                            label: c.name,
                        }))}
                        selectedValue={category}
                        onOptionSelected={(option) => setCategory(option.value)}
                    />
                </div>
                <div className="mt-4">
                    <Label>Stock Unit</Label>
                    <Input
                        type="text"
                        value={stockUnit}
                        onChange={setStockUnit}
                        placeholder="eg: KG"
                    />
                </div>
                <div className="mt-4">
                    <Label>Ingredient Unit</Label>
                    <Input
                        type="text"
                        placeholder="eg: GM"
                        value={ingredientUnit}
                        onChange={setIngredientUnit}
                    />
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
                <div className="mt-4">
                    <Label>Barcode</Label>
                    <Input type="text" value={barcode} onChange={setBarcode} />
                </div>
                <div className="mt-2">
                    <Label>Costing Method</Label>
                    <select
                        value={costingMethod}
                        onChange={(e) => setCostingMethod(e.target.value)}
                        className="w-full p-1 rounded border border-slate-200"
                    >
                        <option value="Fixed">Fixed</option>
                        <option value="From Transactions">
                            From Transactions
                        </option>
                    </select>
                </div>
                <div className="mt-4">
                    <Label>Cost ({localStorage.getItem("currency")})</Label>
                    <Input type="number" value={cost} onChange={setCost} />
                </div>
                <div className="mt-4">
                    <Label>Minimum Level {stockUnit && `(${stockUnit})`}</Label>
                    <Input
                        type="number"
                        value={minLevel}
                        onChange={setMinLevel}
                    />
                </div>
                <div className="mt-4">
                    <Label>Par Level {stockUnit && `(${stockUnit})`}</Label>
                    <Input
                        type="number"
                        value={parLevel}
                        onChange={setParLevel}
                    />
                </div>
                <div className="mt-4">
                    <Label>Maximum Level {stockUnit && `(${stockUnit})`}</Label>
                    <Input
                        type="number"
                        value={maxLevel}
                        onChange={setMaxLevel}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default Item;
