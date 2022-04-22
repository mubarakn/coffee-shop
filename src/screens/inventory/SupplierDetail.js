import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageDetail from "../../components/PageDetail";
import { getSupplier, updateTags } from "./supplierService";
import AssignTags from "../manage/AssignTags";

const SupplierDetail = () => {
    const params = useParams();

    const [supplier, setSupplier] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (params.supplierId) {
            getSupplier(params.supplierId).then((response) => {
                setSupplier(response.data);
                setSelectedTags(response.data.tags || []);
            });
        }
    }, [params.supplierId]);

    const handleSave = (tags) => {
        updateTags(params.supplierId, tags).then((response) => {
            if (response.status === 202) {
                setSelectedTags(tags);
            }
        });
    };

    return (
        <PageDetail
            data={[
                { label: "Code", value: supplier.code },
                { label: "Name", value: supplier.name },
                { label: "Contact Name", value: supplier.contactName },
                { label: "Phone", value: supplier.phone },
                { label: "Email", value: supplier.email },
            ]}
        >
            <AssignTags
                selectedTags={selectedTags}
                onSave={handleSave}
                type="supplier"
                placeholder="Add tags to help you filter and group suppliers easily. You can create tags such as Cash Suppliers, High Quality, etc."
            />
        </PageDetail>
    );
};

export default SupplierDetail;
