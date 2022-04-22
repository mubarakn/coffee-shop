import PageDetail from "../../components/PageDetail";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTags } from "../manage/services/tagsService";
import ItemModal from "../../components/Item";
import AssignTags from "../../screens/manage/AssignTags";
import Button from "../../components/Button";
import { getItem, updateTags, deleteItem } from "./itemService";

const ItemDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [showModal, toggleModal] = useState(false);
    const [item, setItem] = useState({});
    const [tags, setTags] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [customLevels, setCustomLevels] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        getItem(params.itemId).then((response) => {
            setItem(response.data);
            setSelectedTags(response.data.tags);
        });

        getTags("inventoryItem").then((response) => {
            setTags(response.data.tags);
        });
    }, [params.itemId]);

    const handleSave = (item) => {
        toggleModal(false);
        setItem(item);
    };

    const handleCancel = () => {
        toggleModal(false);
    };

    const handleTagsSave = (tags) => {
        updateTags(params.itemId, tags).then((response) => {
            if (response.status === 202) {
                setSelectedTags(tags);
            }
        });
    };

    const handleEditItem = () => {
        toggleModal(true);
    };

    const handleDelete = (id) => {
        navigate("/inventory/items", { replace: true });
    };

    return (
        <PageDetail
            title="Item Detail"
            data={[
                { label: "Code", value: item.code || "-" },
                { label: "Name", value: item.name || "-" },
                { label: "Barcode", value: item.barcode || "-" },
                { label: "Minimum Level", value: item.minLevel || "-" },
                { label: "Par Level", value: item.parLevel || "-" },
                { label: "Maximum Level", value: item.maxLevel || "-" },
                { label: "Stock Unit", value: item.stockUnit || "-" },
                { label: "Ingredient Unit", value: item.ingredientUnit || "-" },
                {
                    label: "Factor",
                    value:
                        `1 ${item.stockUnit} = ${item.conversionFactor} ${item.ingredientUnit}` ||
                        "-",
                },
                { label: "Costing Method", value: item.costingMethod || "-" },
                { label: "Cost", value: item.cost || "-" },
                {
                    label: "Category",
                    value: item.category ? item.category.name : "-",
                },
            ]}
            actions={
                <>
                    <Button title="Edit item" onClick={handleEditItem} />
                </>
            }
        >
            <AssignTags
                type={"inventoryItem"}
                selectedTags={selectedTags}
                onSave={handleTagsSave}
                placeholder="Add tags to help you filter and group items easily. You can create tags such as Main Cashier, Waiter, etc."
            />

            <ItemModal
                id={params.itemId}
                show={showModal}
                onSave={handleSave}
                onClose={handleCancel}
                onDelete={handleDelete}
            />
        </PageDetail>
    );
};

export default ItemDetail;
