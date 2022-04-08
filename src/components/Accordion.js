import { useState } from "react";

const Accordion = ({ header, children }) => {
    const [expanded, toggleExpansion] = useState(false);
    return (
        <div className="p-4">
            <div
                className="cursor-pointer"
                onClick={() => toggleExpansion(!expanded)}
            >
                {header}
            </div>
            {expanded && children}
        </div>
    );
};

export default Accordion;
