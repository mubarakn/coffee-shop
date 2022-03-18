import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: [],
    reducers: {
        addProduct(state, action) {
            state.push(action.payload);
        },

        editProduct(state, action) {
            const {
                id,
                category,
                name,
                price,
                ingredients,
                ingredientQuantities,
            } = action.payload;
            const prod = state.find((p) => p.id === id);
            prod.category = category;
            prod.name = name;
            prod.price = price;
            prod.ingredients = ingredients;
            prod.ingredientQuantities = ingredientQuantities;
        },

        deleteProduct(state, action) {
            return state.filter((p) => p.id !== action.payload);
        },
    },
});

export const { addProduct, editProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
