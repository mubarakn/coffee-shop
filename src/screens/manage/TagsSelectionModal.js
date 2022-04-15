import { useEffect, useState } from "react";
import Dropdown from "../../components/Dropdown";
import Modal from "../../components/Modal";
import { getTags } from "./services/tagsService";

const TagsSelectionModal = ({ show, type, onSave, onCancel, selectedTags }) => {
    const [tags, setTags] = useState([]);
    const [assignedTags, setAssignedTags] = useState(selectedTags);

    useEffect(() => {
        if (show) {
            setAssignedTags(selectedTags);
            getTags(type).then((response) => {
                setTags(response.data.tags);
            });
        } else {
            setAssignedTags([]);
        }
    }, [show]);

    const handleOptionRemoved = (value) => {
        setAssignedTags(assignedTags.filter((tag) => tag !== value));
    };

    const handleOptionSelected = (tag) => {
        setAssignedTags([...assignedTags, tag.value]);
    };

    const handleSave = () => {
        typeof onSave === "function" && onSave(assignedTags);
    };

    return (
        <Modal
            show={show}
            title="Select Tags"
            onSave={handleSave}
            onCancel={onCancel}
        >
            <Dropdown
                data={tags.map((t) => ({ label: t.tag, value: t.id }))}
                selectedValue={assignedTags}
                onOptionRemoved={handleOptionRemoved}
                onOptionSelected={handleOptionSelected}
                multiple
            />
        </Modal>
    );
};

export default TagsSelectionModal;
