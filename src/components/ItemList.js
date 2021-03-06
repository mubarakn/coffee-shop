import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemList = ({ items }) => {
    const navigate = useNavigate();

    const handleItemClick = (id) => {
        navigate(id);
    };

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
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            return (
                                <tr
                                    key={`item-${item.id}`}
                                    className="cursor-pointer hover:bg-slate-100"
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    <td className="w-10 text-center p-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">
                                        {item.stockUnit}
                                    </td>
                                    <td className="text-center">
                                        {item.ingredientUnit}
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
