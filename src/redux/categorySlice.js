import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: [],
    reducers: {
        addCategory(state, action) {
            state.push(action.payload);
        },

        editCategory(state, action) {
            const cat = state.find((s) => s.id === action.payload.id);
            cat.name = action.payload.name;
        },

        deleteCategory(state, action) {
            return state.filter((s) => s.id !== action.payload);
        },
    },
});

export const { addCategory, editCategory, deleteCategory } =
    categorySlice.actions;

export default categorySlice.reducer;
