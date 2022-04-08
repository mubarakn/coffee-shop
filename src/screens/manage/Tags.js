import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import ReasonModal from "./ReasonModal";
import { useEffect, useState } from "react";
import {
    createTag,
    updateTag,
    deleteTag,
    getTags,
} from "./services/tagsService";

const tagTypes = [
    { title: "Customer Tag", type: "customer" },
    { title: "Branch Tag", type: "branch" },
    { title: "Inventory Item Tag", type: "inventoryItem" },
    { title: "Order Tag", type: "order" },
    { title: "Supplier Tag", type: "supplier" },
    { title: "User Tag", type: "user" },
    { title: "Product Tag", type: "product" },
    { title: "Device Tag", type: "device" },
];

const TagsSection = ({ title, type, onCreate, onItemClick, tags }) => {
    return (
        <>
            <div className="flex items-center mb-2">
                <h3 className="mb-4 font-light text-xl text-slate-700">
                    {title}
                </h3>
                <button
                    onClick={() => typeof onCreate && onCreate(type, title)}
                    className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                >
                    Create Tag
                </button>
            </div>
            <div>
                {tags.map((tag, i) => {
                    return (
                        <div
                            key={`tag-${type}-${i}`}
                            onClick={() =>
                                typeof onItemClick === "function" &&
                                onItemClick(tag, title)
                            }
                            className={`p-3 bg-white border-b border-slate-100 cursor-pointer text-slate-600 font-light hover:bg-slate-50 ${
                                i === 0 ? "rounded-t-lg" : ""
                            }
                                        ${
                                            i === tags.length - 1
                                                ? "rounded-b-lg"
                                                : ""
                                        }
                                        `}
                        >
                            {tag.tag}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const Tags = () => {
    const [show, toggleModal] = useState(false);
    const [tagType, setTagType] = useState("");
    const [id, setId] = useState("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);
    const [modalTitle, setModalTitle] = useState("");

    const navigate = useNavigate();
    const hasHistory = window.history.length > 0;

    useEffect(() => {
        getTags()
            .then((response) => {
                console.log(response.data);
                const { tags } = response.data;
                setTags(tags);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const showModal = (type, title) => {
        setTagType(type);
        setModalTitle(`Create ${title}`);
        toggleModal(true);
    };

    const handleModalClose = () => {
        setId("");
        setTagType("");
        setTag("");
        toggleModal(false);
    };

    const handleTagChange = (value) => {
        setTag(value);
    };

    const handleReasonSave = () => {
        if (id) {
            updateTag(id, tag).then((response) => {
                if (response.status === 202) {
                    setTags(
                        tags.map((t) => {
                            if (t.id === id) {
                                return { ...t, tag };
                            }
                            return t;
                        })
                    );
                }
            });
        } else {
            createTag(tagType, tag).then((response) => {
                const { id, type, tag } = response.data;
                if (response.status === 201) {
                    setTags([...tags, { id, type, tag }]);
                }
            });
        }

        toggleModal(false);
        setTagType("");
        setId("");
        setTag("");
    };

    const handleItemClick = (tag, title) => {
        toggleModal(true);
        setTagType(tag.type);
        setId(tag.id);
        setTag(tag.tag);
        setModalTitle(`Edit ${title}`);
    };

    const handleOnCreate = (type, title) => {
        showModal(type, title);
    };

    const handleDelete = () => {
        deleteTag(id).then((response) => {
            if (response.status === 204) {
                setTags(tags.filter((tag) => tag.id !== id));
                setId("");
                setTagType("");
                setTag("");
                toggleModal(false);
            }
        });
    };

    return (
        <div className="w-full h-full">
            <div className="bg-white px-10 py-2">
                {hasHistory && (
                    <button
                        className="flex items-center text-slate-600 hover:text-slate-700"
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineLeft className="mr-1" />
                        <span className="font-light">Back</span>
                    </button>
                )}
                <h1 className="text-3xl font-light">Tags</h1>
            </div>
            <div className="flex flex-col h-full mt-10 items-center">
                <div className="w-2/4">
                    {tagTypes.map((tagType, i) => (
                        <div key={`tagType-${i}`} className="mb-10">
                            <TagsSection
                                type={tagType.type}
                                title={tagType.title}
                                onCreate={handleOnCreate}
                                tags={tags.filter(
                                    (t) => t.type === tagType.type
                                )}
                                onItemClick={handleItemClick}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ReasonModal
                show={show}
                title={modalTitle}
                type={tagType}
                onClose={handleModalClose}
                reason={tag}
                onReasonChange={handleTagChange}
                onSave={handleReasonSave}
                onDelete={handleDelete}
                deleteText={id ? "Delete Reason" : ""}
            />
        </div>
    );
};

export default Tags;
