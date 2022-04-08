import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "./redux/categorySlice";
import { addProduct } from "./redux/productSlice";
import { addItem, editItem } from "./redux/itemSlice";
import { Route, Routes, Navigate } from "react-router-dom";
import app from "./firebaseApp";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

//screens
import Entry from "./screens/Entry";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Manage from "./screens/Manage";
import ManageMore from "./screens/ManageMore";

import Order from "./screens/Order";
import Categories from "./screens/Categories";
import Products from "./screens/Products";
import Items from "./screens/Items";
import Settings from "./screens/manage/Settings";
import axios from "axios";
import Reasons from "./screens/manage/Reasons";
import Tags from "./screens/manage/Tags";
import Taxes from "./screens/manage/Taxes";

const initAxios = () => {
    axios.interceptors.request.use(function (config) {
        if (localStorage.getItem("authToken")) {
            config.headers.Authorization = `Bearer ${localStorage.getItem(
                "authToken"
            )}`;
        }

        return config;
    });
};
initAxios();

const Logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("refreshToken");
    return <Navigate to="/" />;
};

const db = getFirestore(app);
function App() {
    const dispatch = useDispatch();

    /*
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
    */

    return (
        <Routes>
            <Route path="/" element={<Entry />}>
                <Route path="/logout" element={<Logout />} />
                <Route path="" element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="manage" element={<Manage />}>
                    <Route path="more" element={<ManageMore />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="reasons" element={<Reasons />} />
                    <Route path="tags" element={<Tags />} />
                    <Route path="taxes" element={<Taxes />} />
                </Route>
            </Route>

            {/* Modify the below routes later on */}
            <Route path="/order" element={<Order />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />

            <Route path="/items" element={<Items />} />
        </Routes>
    );
}

export default App;
