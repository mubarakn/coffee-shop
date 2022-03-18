import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import productSlice from "./productSlice";
import itemSlice from "./itemSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        products: productSlice,
        items: itemSlice,
        cart: cartSlice,
    },
});

export default store;
