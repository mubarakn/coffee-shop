import { useState } from "react";
import { useEffect, useSelector } from "react-redux";
import Item from "./Item";

const ItemList = () => {
    const items = useSelector((state) => state.items);
    return (
        <div className="flex rounded justify-center">
            <div className="bg-white w-10/12 mt-10 p-4 rounded shadow">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-10">
                                <input type="checkbox" />
                            </th>
                            <th>Name</th>
                            <th>Stock Unit</th>
                            <th>Ingredient Unit</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            return (
                                <tr key={`item-${item.id}`}>
                                    <td className="w-10 text-center">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">
                                        {item.stockUnit}
                                    </td>
                                    <td className="text-center">
                                        {item.ingredientUnit}
                                    </td>
                                    <td className="text-right">
                                        {item.openingStock}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ItemList;
