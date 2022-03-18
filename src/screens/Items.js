import Master from "./Master";
import MasterContentHeader from "../components/MasterContentHeader";
import { useState } from "react";
import Item from "../components/Item";
import ItemList from "../components/ItemList";

const Items = () => {
    const [showModal, toggleModal] = useState(false);

    return (
        <Master>
            <MasterContentHeader title="Items">
                <button
                    className="ml-auto bg-teal-500 px-4 py-2 text-white rounded hover:bg-teal-600 hover:shadow transition"
                    onClick={() => toggleModal(true)}
                >
                    Create Item
                </button>
            </MasterContentHeader>
            <ItemList />
            <Item show={showModal} onClose={() => toggleModal(false)} />
        </Master>
    );
};

export default Items;
