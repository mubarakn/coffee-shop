import { useState } from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

const ProductList = () => {
    const [categories, products] = useSelector((state) => [
        state.categories,
        state.products,
    ]);
    const categoryMap = categories.reduce((acc, cat) => {
        if (!acc[cat.id]) {
            acc[cat.id] = cat.name;
        }
        return acc;
    }, {});

    return (
        <div className="flex rounded justify-center">
            <div className="bg-white w-10/12 mt-10 p-4 rounded shadow">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-10">
                                <input type="checkbox" />
                            </th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={`product-${product.id}`}>
                                    <td className="w-10 text-center">
                                        <input type="checkbox" />
                                    </td>
                                    <td>{categoryMap[product.category]}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;
