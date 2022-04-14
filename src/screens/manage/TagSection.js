import { useState } from "react";
import TagModal from "./TagModal";

const TagSection = ({ title, type, tags, onAdd, onUpdate, onDelete }) => {
    const [showModal, toggleModal] = useState(false);
    const [id, setId] = useState("");

    const handleClose = () => {
        setId("");
        toggleModal(false);
    };

    const handleSave = (tag) => {
        if (!id && typeof onAdd === "function") {
            onAdd(tag);
        } else if (id && typeof onUpdate === "function") {
            onUpdate(tag);
        }
        handleClose();
    };

    const handleDelete = () => {
        if (typeof onDelete === "function") {
            onDelete(id);
            handleClose();
        }
    };

    const handleCreate = () => {
        setId("");
        toggleModal(true);
    };

    const handleTagClick = (tag) => {
        setId(tag.id);
        toggleModal(true);
    };

    return (
        <>
            <div className="flex items-center mb-2">
                <h3 className="mb-4 font-light text-xl text-slate-700">
                    {title}
                </h3>
                <button
                    onClick={handleCreate}
                    className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                >
                    Create Tag
                </button>
            </div>
            <div>
                {tags.map((tag, i) => {
                    const isFirst = i === 0;
                    const isLast = i === tags.length - 1;
                    return (
                        <div
                            key={`tag-${type}-${i}`}
                            className={`p-3 bg-white border-b border-slate-100 cursor-pointer text-slate-600 font-light hover:bg-slate-50
                                ${isFirst && "rounded-t-lg"}
                                ${isLast && "rounded-b-lg"}
                            `}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag.tag}
                        </div>
                    );
                })}
            </div>
            <TagModal
                id={id}
                title={title}
                show={showModal}
                type={type}
                onClose={handleClose}
                onSave={handleSave}
                onDelete={handleDelete}
            />
        </>
    );
};

export default TagSection;
