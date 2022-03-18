import Master from "./Master";
import CategoryList from "../components/CategoryList";
import { useState } from "react";
import Category from "../components/Category";
import MasterContentHeader from "../components/MasterContentHeader";

//Category Structure
// { id: i, name: `Category ${i}` }

const Categories = () => {
    const [showModal, toggleModal] = useState(false);

    return (
        <Master>
            <MasterContentHeader title="Categories">
                <button
                    className="ml-auto bg-teal-500 px-4 py-2 text-white rounded hover:bg-teal-600 hover:shadow transition"
                    onClick={() => toggleModal(true)}
                >
                    Create Category
                </button>
            </MasterContentHeader>
            <CategoryList />
            <Category show={showModal} onClose={() => toggleModal(false)} />
        </Master>
    );
};

export default Categories;
