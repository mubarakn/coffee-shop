import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "./redux/categorySlice";
import { addProduct } from "./redux/productSlice";
import { addItem, editItem } from "./redux/itemSlice";
import { Route, Routes, Navigate } from "react-router-dom";
import app from "./firebaseApp";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Bugsnag from "@bugsnag/js";

//screens
import Entry from "./screens/Entry";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import ManageMore from "./screens/ManageMore";

import axios from "axios";

import Order from "./screens/Order";
import Categories from "./screens/Categories";
import Products from "./screens/Products";
import Items from "./screens/Items";
import Settings from "./screens/manage/Settings";
import Reasons from "./screens/manage/Reasons";
import Tags from "./screens/manage/Tags";
import TaxesAndTaxGroups from "./screens/manage/TaxesAndTaxGroups";
import PaymentMethods from "./screens/manage/PaymentMethods";
import Charges from "./screens/manage/Charges";
import Branches from "./screens/manage/Branches";
import Users from "./screens/manage/Users";
import Roles from "./screens/manage/Roles";
import UserDetail from "./screens/manage/UserDetail";
import Devices from "./screens/manage/Devices";
import Register from "./screens/Register";
import DeviceDetail from "./screens/manage/DeviceDetail";
import ItemDetail from "./screens/inventory/ItemDetail";
import Suppliers from "./screens/inventory/Suppliers";
import SupplierDetail from "./screens/inventory/SupplierDetail";
import MenuCategories from "./screens/MenuCategories";

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
    localStorage.removeItem("currency");
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
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />

                {/* START OF INVENTORY MENU */}
                <Route path="inventory">
                    <Route path="categories" element={<Categories />} />
                    <Route path="items" element={<Items />} />
                    <Route path="items/:itemId" element={<ItemDetail />} />
                    <Route path="suppliers" element={<Suppliers />} />
                    <Route
                        path="suppliers/:supplierId"
                        element={<SupplierDetail />}
                    />
                </Route>
                {/* END OF INVENTORY MENU */}

                {/* START OF MENU MENU */}
                <Route path="menu">
                    <Route path="categories" element={<MenuCategories />} />
                    <Route path="products" element={<Products />} />
                </Route>
                {/* END OF MENU MENU */}

                {/* START OF MANAGE MENU */}
                <Route path="manage/more" element={<ManageMore />} />
                <Route path="manage/settings" element={<Settings />} />
                <Route path="manage/reasons" element={<Reasons />} />
                <Route path="manage/tags" element={<Tags />} />
                <Route path="manage/taxes" element={<TaxesAndTaxGroups />} />
                <Route
                    path="manage/payment-methods"
                    element={<PaymentMethods />}
                />
                <Route path="manage/charges" element={<Charges />} />
                <Route path="manage/branches" element={<Branches />} />
                <Route path="manage/devices" element={<Devices />} />
                <Route
                    path="manage/devices/:deviceId"
                    element={<DeviceDetail />}
                />
                <Route path="manage/users" element={<Users />} />
                <Route path="manage/users/:userId" element={<UserDetail />} />
                <Route path="manage/roles" element={<Roles />} />
                {/* END OF MANAGE MENU */}
            </Route>

            {/* Modify the below routes later on */}
            <Route path="/order" element={<Order />} />
            <Route path="/categories" element={<Categories />} />

            <Route path="/items" element={<Items />} />
        </Routes>
    );
}

export default App;
