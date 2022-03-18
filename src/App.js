import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "./redux/categorySlice";
import { addProduct } from "./redux/productSlice";
import { addItem, editItem } from "./redux/itemSlice";
import { Route, Routes } from "react-router-dom";
import app from "./firebaseApp";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

//screens
import Dashboard from "./screens/Dashboard";
import Order from "./screens/Order";
import Categories from "./screens/Categories";
import Products from "./screens/Products";
import Items from "./screens/Items";

const db = getFirestore(app);
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const categoryUnsubscribe = onSnapshot(
            collection(db, "categories"),
            (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        dispatch(
                            addCategory({
                                id: change.doc.id,
                                ...change.doc.data(),
                            })
                        );
                    }
                });
            }
        );

        const itemUnsubscribe = onSnapshot(
            collection(db, "items"),
            (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    console.log(change.type, change.doc.id, change.doc.data());
                    if (change.type === "added") {
                        dispatch(
                            addItem({
                                id: change.doc.id,
                                ...change.doc.data(),
                            })
                        );
                    } else if (change.type === "modified") {
                        dispatch(
                            editItem({
                                id: change.doc.id,
                                ...change.doc.data(),
                            })
                        );
                    }
                });
            }
        );

        const productUnsubscribe = onSnapshot(
            collection(db, "products"),
            (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        dispatch(
                            addProduct({
                                id: change.doc.id,
                                ...change.doc.data(),
                            })
                        );
                    }
                });
            }
        );

        return () => {
            categoryUnsubscribe();
            itemUnsubscribe();
            productUnsubscribe();
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />

            <Route path="/items" element={<Items />} />
        </Routes>
    );
}

export default App;
