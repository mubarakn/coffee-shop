import Master from "./Master";
import MasterContentHeader from "../components/MasterContentHeader";
import { useState } from "react";
import ProductList from "../components/ProductList";
import Product from "../components/Product";
import Page from "./Page";

const Products = () => {
    const [showModal, toggleModal] = useState(false);

    return (
        <Page
            title="Products"
            actions={
                <button
                    className="ml-auto bg-teal-500 px-4 py-2 text-white rounded hover:bg-teal-600 hover:shadow transition"
                    onClick={() => toggleModal(true)}
                >
                    Create Product
                </button>
            }
        >
            <ProductList />
            <Product show={showModal} onClose={() => toggleModal(false)} />
        </Page>
    );
};

export default Products;
