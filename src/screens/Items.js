import { useEffect, useState } from "react";
import Item from "../components/Item";
import ItemList from "../components/ItemList";
import { deleteItem, getItems } from "./inventory/itemService";
import Page from "./Page";

const Items = () => {
    const [id, setId] = useState("");
    const [showModal, toggleModal] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems().then((response) => {
            setItems(response.data.items);
        });
    }, []);

    const handleSave = (item) => {
        console.log(id, item);
        if (id) {
            //update
            setItems(
                items.map((i) => {
                    if (i.id === item.id) {
                        return item;
                    }
                    return i;
                })
            );
        } else {
            //insert
            setItems([...items, item]);
        }
        console.log(item);
        toggleModal(false);
    };

    const handleDelete = (id) => {
        deleteItem(id).then((response) => {
            if (response.status === 204) {
                toggleModal(false);
                setId("");
            }
        });
    };

    return (
        <Page
            title="Items"
            actions={
                <button
                    className="ml-auto bg-teal-500 px-4 py-2 text-white rounded hover:bg-teal-600 hover:shadow transition"
                    onClick={() => toggleModal(true)}
                >
                    Create Item
                </button>
            }
        >
            <div className="w-full h-full">
                <ItemList items={items} />
                <Item
                    id={id}
                    show={showModal}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={() => toggleModal(false)}
                />
            </div>
        </Page>
    );
};

export default Items;
