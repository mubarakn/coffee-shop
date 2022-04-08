import Master from "./Master";
import CategoryList from "../components/CategoryList";
import { useState } from "react";
import Category from "../components/Category";
import MasterContentHeader from "../components/MasterContentHeader";
import Button from "../components/Button";

//Category Structure
// { id: i, name: `Category ${i}` }

const Categories = () => {
    const [showModal, toggleModal] = useState(false);

    return (
        <Master>
            <MasterContentHeader title="Categories">
                <Button
                    title="Create Category"
                    onClick={() => toggleModal(true)}
                    primary
                />
            </MasterContentHeader>
            <CategoryList />
            <Category show={showModal} onClose={() => toggleModal(false)} />
        </Master>
    );
};

export default Categories;
