import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: "item",
    initialState: [],
    reducers: {
        addItem(state, action) {
            state.push(action.payload);
        },

        editItem(state, action) {
            const { id, name, stockUnit, ingredientUnit, conversionQuantity } =
                action.payload;
            return state.filter((item) => {
                if (item.id === id) {
                    return {
                        name,
                        stockUnit,
                        ingredientUnit,
                        conversionQuantity,
                    };
                }
                return item;
            });
        },

        deleteItem(state, action) {
            const { id } = action.payload;
            return state.filter((i) => i.id !== id);
        },
    },
});

export const { addItem, editItem, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
