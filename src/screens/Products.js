import Master from "./Master";
import MasterContentHeader from "../components/MasterContentHeader";
import { useState } from "react";
import ProductList from "../components/ProductList";
import Product from "../components/Product";

const Products = () => {
    const [showModal, toggleModal] = useState(false);

    return (
        <Master>
            <MasterContentHeader title="Products">
                <button
                    className="ml-auto bg-teal-500 px-4 py-2 text-white rounded hover:bg-teal-600 hover:shadow transition"
                    onClick={() => toggleModal(true)}
                >
                    Create Product
                </button>
            </MasterContentHeader>
            <ProductList />
            <Product show={showModal} onClose={() => toggleModal(false)} />
        </Master>
    );
};

export default Products;
