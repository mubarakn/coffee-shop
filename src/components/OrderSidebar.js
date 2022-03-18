import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../redux/cartSlice";
import OrderMaster from "./OrderMaster";
import OrderNumber from "./OrderNumber";
import {
    getFirestore,
    collection,
    doc,
    updateDoc,
    setDoc,
    addDoc,
} from "firebase/firestore";
import app from "../firebaseApp";

const db = getFirestore(app);
const OrderSidebar = () => {
    const dispatch = useDispatch();
    const [subTotal, setSubTotal] = useState(0);
    const [productsMap, setProductsMap] = useState({});
    const [ingredientsMap, setIngredientsMap] = useState({});

    const [cart, products, ingredients] = useSelector((state) => [
        state.cart,
        state.products,
        state.items,
    ]);

    useEffect(() => {
        const map = products.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = item;
            }
            return acc;
        }, {});
        setProductsMap(map);
    }, [products]);

    useEffect(() => {
        const map = ingredients.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = item;
            }
            return acc;
        }, {});
        setIngredientsMap(map);
    }, [ingredients]);

    useEffect(() => {
        const totalAmount = cart.reduce((acc, item) => {
            acc += item.price * item.quantity;
            return acc;
        }, 0);
        setSubTotal(totalAmount);
    }, [cart]);

    const handleSave = async () => {
        //reduce the ingredient qty
        for (let i = 0; i < cart.length; i++) {
            const itm = cart[i];
            const prod = productsMap[itm.item];
            for (let j = 0; j < prod.ingredients.length; j++) {
                const ing = prod.ingredients[j];
                const qty = prod.ingredientQuantities[j];
                const ingStock = ingredientsMap[ing].openingStock;
                const openingStock =
                    parseInt(ingStock) -
                    parseInt(qty) / parseInt(prod.makeQuantity);
                await updateDoc(doc(db, "items", ing), { openingStock });
            }
        }

        const dbProducts = cart.map((product) => {
            console.log(product);
            return {
                product: product.item,
                quantity: product.quantity,
                price: product.price,
                amount: product.quantity * product.price,
            };
        });

        await addDoc(collection(db, "orders"), { items: dbProducts });
        dispatch(resetCart());
    };

    return (
        <div className="bg-slate-100 h-full p-4">
            <OrderNumber />

            <OrderMaster />

            <div className="mt-4 bg-white p-4 rounded-t shadow">
                {/* Cart */}
                <div>
                    {cart.map((product) => {
                        return (
                            <div
                                key={product.id}
                                className="flex p-3 border-b border-slate-100 text-sm"
                            >
                                <div className="flex-1 font-semibold">
                                    {product.quantity} {product.name}
                                </div>
                                <div className="font-light">
                                    {product.currencyUnit}{" "}
                                    {product.price * product.quantity}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div mt-2>
                    <div className="flex p-2">
                        <div className="flex-1 font-light">Subtotal</div>
                        <div>INR {subTotal}</div>
                    </div>
                    <div className="flex p-2">
                        <div className="flex-1 font-light">Taxes</div>
                        <div>INR 0</div>
                    </div>
                    <div className="flex p-2 text-xl">
                        <div className="flex-1">Grand Total</div>
                        <div>INR {subTotal}</div>
                    </div>
                </div>
            </div>
            <button
                className="p-4 bg-teal-500 w-full rounded-b text-white hover:bg-teal-600 shadow"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
};

export default OrderSidebar;
