import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Page from "../Page";
import SupplierList from "./SupplierList";
import SupplierModal from "./SupplierModal";
import { getSuppliers } from "./supplierService";

const Suppliers = () => {
    const [showModal, toggleModal] = useState(false);
    const [id, setId] = useState("");
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        getSuppliers().then((response) => {
            setSuppliers(response.data.suppliers);
        });
    }, []);

    const handleAddSupplier = () => {
        toggleModal(true);
    };

    const handleSave = (supplier) => {
        setSuppliers([...suppliers, supplier]);
        toggleModal(false);
    };

    return (
        <Page
            title="Suppliers"
            actions={
                <Button title="Add Supplier" onClick={handleAddSupplier} />
            }
        >
            <SupplierList suppliers={suppliers} />
            <SupplierModal
                id={id}
                show={showModal}
                onSave={handleSave}
                onClose={() => toggleModal(false)}
            />
        </Page>
    );
};

export default Suppliers;
