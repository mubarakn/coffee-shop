import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addProduct(state, action) {
            state.push(action.payload);
        },

        editProduct(state, action) {
            const prod = state.find((p) => p.id === action.payload.id);
            prod.item = action.payload.item;
            prod.quantity = action.payload.quantity;
            prod.price = action.payload.price;
        },

        deleteProduct(state, action) {
            return state.filter((p) => p.id !== action.payload.id);
        },

        resetCart(state, action) {
            return [];
        },
    },
});

export const { addProduct, editProduct, deleteProduct, resetCart } =
    cartSlice.actions;

export default cartSlice.reducer;
