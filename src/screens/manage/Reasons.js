import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import ReasonModal from "./ReasonModal";
import { useEffect, useState } from "react";
import {
    createReason,
    updateReason,
    deleteReason,
    getReasons,
} from "./services/reasonsService";

const voidAndReturn = "voidAndReturn";
const quantityAdjustment = "quantityAdjustment";
const drawerOperation = "drawerOperation";

const ReasonSection = ({ title, type, onCreate, onItemClick, reasons }) => {
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
                    Create Reason
                </button>
            </div>
            <div>
                {reasons.map((reason, i) => {
                    return (
                        <div
                            key={`reason-${type}-${i}`}
                            onClick={() =>
                                typeof onItemClick === "function" &&
                                onItemClick(reason, title)
                            }
                            className={`p-3 bg-white border-b border-slate-100 cursor-pointer text-slate-600 font-light hover:bg-slate-50 ${
                                i === 0 ? "rounded-t-lg" : ""
                            }
                                        ${
                                            i === reasons.length - 1
                                                ? "rounded-b-lg"
                                                : ""
                                        }
                                        `}
                        >
                            {reason.reason}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const Reasons = () => {
    const [show, toggleModal] = useState(false);
    const [reasonType, setReasonType] = useState("");
    const [id, setId] = useState("");
    const [reason, setReason] = useState("");
    const [reasons, setReasons] = useState([]);
    const [modalTitle, setModalTitle] = useState("");

    const navigate = useNavigate();
    const hasHistory = window.history.length > 0;

    useEffect(() => {
        getReasons().then((response) => {
            const { reasons } = response.data;
            setReasons(reasons);
        });
    }, []);

    const showModal = (type, title) => {
        setReasonType(type);
        setModalTitle(`Create ${title}`);
        toggleModal(true);
    };

    const handleModalClose = () => {
        setId("");
        setReasonType("");
        setReason("");
        toggleModal(false);
    };

    const handleReasonChange = (value) => {
        setReason(value);
    };

    const handleReasonSave = () => {
        if (id) {
            updateReason(id, reason).then((response) => {
                if (response.status === 202) {
                    setReasons(
                        reasons.map((r) => {
                            if (r.id === id) {
                                return { ...r, reason };
                            }
                            return r;
                        })
                    );
                }
            });
        } else {
            createReason(reasonType, reason).then((response) => {
                const { id, type, reason } = response.data;
                if (response.status === 201) {
                    setReasons([...reasons, { id, type, reason }]);
                }
            });
        }

        toggleModal(false);
        setReasonType("");
        setId("");
        setReason("");
    };

    const handleItemClick = (reason, title) => {
        toggleModal(true);
        setReasonType(reason.type);
        setId(reason.id);
        setReason(reason.reason);
        setModalTitle(`Edit ${title}`);
    };

    const handleOnCreate = (type, title) => {
        showModal(type, title);
    };

    const handleDelete = () => {
        deleteReason(id).then((response) => {
            if (response.status === 204) {
                setReasons(reasons.filter((reason) => reason.id !== id));
                setId("");
                setReasonType("");
                setReason("");
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
                <h1 className="text-3xl font-light">Reasons</h1>
            </div>
            <div className="flex flex-col h-full mt-10 items-center">
                <div className="w-2/4">
                    <ReasonSection
                        type={voidAndReturn}
                        title="Void and Return Reason"
                        onCreate={handleOnCreate}
                        reasons={reasons.filter(
                            (r) => r.type === voidAndReturn
                        )}
                        onItemClick={handleItemClick}
                    />
                    <div className="mt-10">
                        <ReasonSection
                            type={quantityAdjustment}
                            title="Quantity Adjustment Reason"
                            onCreate={handleOnCreate}
                            reasons={reasons.filter(
                                (r) => r.type === quantityAdjustment
                            )}
                            onItemClick={handleItemClick}
                        />
                    </div>

                    <div className="mt-10">
                        <ReasonSection
                            type={drawerOperation}
                            title="Drawer Operation Reason"
                            onCreate={handleOnCreate}
                            reasons={reasons.filter(
                                (r) => r.type === drawerOperation
                            )}
                            onItemClick={handleItemClick}
                        />
                    </div>
                </div>
            </div>
            <ReasonModal
                show={show}
                title={modalTitle}
                type={reasonType}
                onClose={handleModalClose}
                reason={reason}
                onReasonChange={handleReasonChange}
                onSave={handleReasonSave}
                onDelete={handleDelete}
                deleteText={id ? "Delete Reason" : ""}
            />
        </div>
    );
};

export default Reasons;
