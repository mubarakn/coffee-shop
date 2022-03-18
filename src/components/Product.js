import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AssignIngredient from "./AssignIngredient";
import Modal from "./Modal";
import app from "../firebaseApp";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";

const db = getFirestore(app);
const Product = ({ show, onClose }) => {
    const nameRef = useRef(null);
    const [categories, items] = useSelector((state) => [
        state.categories,
        state.items,
    ]);

    const [showAssignIngredient, toggleAssignIngredient] = useState(false);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [makeQuantity, setMakeQuantity] = useState(1);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientQuantities, setIngredientQuantities] = useState([]);
    const [ingredientsMap, setIngredientsMap] = useState({});

    useEffect(() => {
        setIngredientsMap(
            items.reduce((acc, item) => {
                if (!acc[item.id]) {
                    acc[item.id] = item;
                }
                return acc;
            }, {})
        );
    }, [items]);

    useEffect(() => {
        setIngredientQuantities(
            ingredients.map((i, idx) => {
                if (ingredientQuantities[idx]) {
                    return ingredientQuantities[idx];
                }
                return "";
            })
        );
    }, [ingredients]);

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    const handleSave = async () => {
        const data = {
            category,
            name,
            price: parseInt(price),
            ingredients,
            ingredientQuantities,
            makeQuantity: parseInt(makeQuantity),
        };
        const newProductRef = doc(collection(db, "products"));
        await setDoc(newProductRef, data);

        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleAdd = (ingredient) => {
        //TODO remove the parseInt if you are gonna use mongodb or firebase because id won't be integer
        setIngredients([...ingredients, ingredient]);
        toggleAssignIngredient(false);
    };

    const handleClose = () => {
        toggleAssignIngredient(false);
    };

    return (
        <Modal
            title="Add Product"
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            width="w-2/5"
        >
            <div className="flex">
                <div className="flex-1 mr-1">
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
                    <div className="mt-2">
                        <label className="font-light text-slate-600 text-sm">
                            Category
                        </label>
                        <select
                            className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select</option>
                            {categories.map((category) => (
                                <option
                                    key={`category-${category.id}`}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2">
                        <label className="font-light text-slate-600 text-sm">
                            Price
                        </label>
                        <input
                            type="number"
                            className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 h-full min-h-0 ml-1">
                    <div className="flex">
                        <label className="font-light text-slate-600 text-sm flex-1">
                            Ingredients
                        </label>
                        {ingredients.length < items.length && (
                            <button
                                className="underline text-teal-500 text-xs"
                                onClick={() => toggleAssignIngredient(true)}
                            >
                                Add Ingredient
                            </button>
                        )}
                    </div>
                    {ingredients.length > 0 && (
                        <div className="bg-white p-1 flex items-center text-slate-600 mt-2 rounded">
                            <span>To make</span>
                            <input
                                type="number"
                                className="bg-slate-100 p-1 w-20 ml-2 border border-slate-200 rounded"
                                value={makeQuantity}
                                onChange={(e) =>
                                    setMakeQuantity(e.target.value)
                                }
                            />
                            {name && (
                                <>
                                    <span className="ml-2">{name}</span>
                                    <span className="ml-2">I need</span>
                                </>
                            )}
                        </div>
                    )}
                    <ul className="mt-1">
                        {ingredients.map((ingredient, idx) => (
                            <li
                                key={`product-ingredient-${ingredient}`}
                                className="bg-white p-2 mb-1 rounded text-sm text-slate-600 cursor-pointer flex items-center"
                            >
                                <span className="flex-1">
                                    {ingredientsMap[ingredient].name}
                                </span>
                                <input
                                    type="number"
                                    className="bg-slate-100 w-20 p-1 mr-1 border border-slate-200 rounded"
                                    value={ingredientQuantities[idx] || ""}
                                    onChange={(e) => {
                                        setIngredientQuantities(
                                            ingredientQuantities.map(
                                                (qty, qtyIdx) => {
                                                    if (qtyIdx === idx) {
                                                        return parseInt(
                                                            e.target.value
                                                        );
                                                    }
                                                    return qty;
                                                }
                                            )
                                        );
                                    }}
                                />
                                <span>
                                    {ingredientsMap[ingredient].ingredientUnit}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <AssignIngredient
                ingredients={ingredients}
                show={showAssignIngredient}
                onAdd={handleAdd}
                onClose={handleClose}
            />
        </Modal>
    );
};

export default Product;
