import { useEffect, useState } from "react";
import { getReasons } from "./services/reasonsService";

import ReasonSection from "./ReasonSection";
import Page from "../Page";

const reasonTypes = [
    { type: "voidAndReturn", title: "Void and Return Reason" },
    { type: "quantityAdjustment", title: "Quantity Adjustment Reason" },
    { type: "drawerOperation", title: "Drawer Operation Reason" },
];

const Reasons = () => {
    const [reasons, setReasons] = useState([]);

    useEffect(() => {
        getReasons().then((response) => {
            const { reasons } = response.data;
            setReasons(reasons);
        });
    }, []);

    const handleAdd = (reason) => {
        setReasons([...reasons, reason]);
    };

    const handleUpdate = (reason) => {
        setReasons(
            reasons.map((r) => {
                if (r.id === reason.id) {
                    return reason;
                }
                return r;
            })
        );
    };

    const handleDelete = (id) => {
        setReasons(reasons.filter((r) => r.id !== id));
    };

    return (
        <Page title="Reasons" back>
            <div className="flex flex-col h-full mt-10 items-center">
                <div className="w-2/4">
                    {reasonTypes.map((reasonType) => {
                        return (
                            <div
                                key={`reasonType-${reasonType.type}`}
                                className="mb-10"
                            >
                                <ReasonSection
                                    title={reasonType.title}
                                    type={reasonType.type}
                                    reasons={reasons.filter(
                                        (r) => r.type === reasonType.type
                                    )}
                                    onAdd={handleAdd}
                                    onUpdate={handleUpdate}
                                    onDelete={handleDelete}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Page>
    );
};

export default Reasons;
