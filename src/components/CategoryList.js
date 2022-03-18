import { useState } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";

const CategoryList = () => {
    const categories = useSelector((state) => state.categories);

    return (
        <div className="flex rounded justify-center">
            <div className="bg-white w-10/12 mt-10 p-4 rounded shadow">
                <table>
                    <thead>
                        <tr>
                            <th className="w-10">
                                <input type="checkbox" />
                            </th>
                            <th className="text-left">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => {
                            return (
                                <tr key={`category-${category.id}`}>
                                    <td className="w-10 text-center">
                                        <input type="checkbox" />
                                    </td>
                                    <td>{category.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
