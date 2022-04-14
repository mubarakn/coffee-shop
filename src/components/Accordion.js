import { useEffect, useState } from "react";

const Accordion = ({ header, children, expand }) => {
    const [expanded, toggleExpansion] = useState(expand || false);

    useEffect(() => {
        toggleExpansion(expand);
    }, [expand]);

    return (
        <div className={`p-4 ${!expanded ? "bg-white" : "bg-slate-100"}`}>
            <div
                className="cursor-pointer"
                onClick={() => toggleExpansion(!expanded)}
            >
                <h4 className="text-xl">{header}</h4>
            </div>
            {expanded && children}
        </div>
    );
};

export default Accordion;
