import { useEffect, useState } from "react";
import { getTags } from "./services/tagsService";
import TagsSelectionModal from "./TagsSelectionModal";

const AssignTags = ({ type, selectedTags, onSave, placeholder }) => {
    const [showModal, toggleModal] = useState(false);
    const [tagsMap, setTagsMap] = useState({});

    useEffect(() => {
        getTags(type).then((response) => {
            setTagsMap(
                response.data.tags.reduce((acc, item) => {
                    acc[item.id] = item.tag;
                    return acc;
                }, {})
            );
        });
    }, []);

    const handleSave = (tags) => {
        toggleModal(false);
        typeof onSave === "function" && onSave(tags);
    };

    const handleItemClick = (e) => {
        e.stopPropagation();
        toggleModal(true);
    };

    return (
        <>
            <div className="px-8 md:px-16 py-8 mx-auto max-w-4xl">
                <div className="flex items-center text-slate-600 font-light">
                    <h1 className="text-xl">Tags</h1>
                    <button
                        className="ml-auto px-4 py-1 bg-white rounded-lg border border-slate-300 hover:text-black"
                        onClick={() => toggleModal(true)}
                    >
                        Add Tags
                    </button>
                </div>

                <div
                    className="flex flex-wrap bg-white p-6 rounded-lg mt-6"
                    onClick={handleItemClick}
                >
                    {selectedTags.length > 0 ? (
                        selectedTags.map((t) => (
                            <span
                                key={`tag-${t}`}
                                className="mr-2 px-2 py-1 border rounded-lg border-teal-500 bg-white text-slate-600 hover:border-pink-500 cursor-pointer font-light"
                            >
                                {tagsMap[t]}
                            </span>
                        ))
                    ) : (
                        <p className="text-slate-600 text-center font-light">
                            {placeholder}
                        </p>
                    )}
                </div>
            </div>
            <TagsSelectionModal
                show={showModal}
                type={type}
                selectedTags={selectedTags}
                onSave={handleSave}
                onCancel={() => toggleModal(false)}
            />
        </>
    );
};

export default AssignTags;
