import { useCallback, useEffect, useRef, useState } from "react";

const DropdownItem = ({ selected, displayText, onClick }) => {
    return (
        <div
            className={`p-1 bg-white hover:bg-slate-50 rounded cursor-pointer text-slate-600
            ${selected && "bg-slate-50"}`}
            onClick={() => typeof onClick === "function" && onClick()}
        >
            {displayText}
        </div>
    );
};

const Dropdown = ({ data, onOptionSelected, multiple, selectedValue }) => {
    const dataMap = data.reduce((acc, item) => {
        if (!acc[item.value]) {
            acc[item.value] = item.label;
        }
        return acc;
    }, {});
    const queryRef = useRef(null);
    const [query, setQuery] = useState("");
    const [showList, toggleList] = useState(false);
    const [values, setValues] = useState(
        multiple
            ? Array.isArray(selectedValue)
                ? selectedValue
                : []
            : selectedValue
    );

    const listener = useCallback(
        (e) => {
            if (e.target.classList.contains("dropdown-query")) {
                return;
            }
            if (showList) {
                toggleList(false);
            }
        },
        [showList]
    );

    useEffect(() => {
        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
    }, [listener]);

    useEffect(() => {
        if (showList) {
            queryRef.current.focus();
        }
    }, [showList]);

    const handleItemClick = (item, index) => {
        if (!item && !multiple) {
            setValues(null);
            return;
        }

        if (!item && multiple) {
            return;
        }

        if (multiple) {
            setValues(
                Array.isArray(values) ? [...values, item.value] : [item.value]
            );
        } else {
            setValues(item.value);
        }
        typeof onOptionSelected === "function" && onOptionSelected(item);
    };

    const handleRemove = (value) => {
        if (multiple) {
            setValues(values.filter((val) => val !== value));
        }
    };

    let labels = "";
    if (!values || (Array.isArray(values) && !values.length)) {
        labels = "Select...";
    } else if (multiple) {
        labels = values.map((val) => (
            <div
                key={val}
                className="flex mr-2 rounded text-slate-600 overflow-hidden bg-slate-50"
            >
                <span className="p-1">{dataMap[val]}</span>
                <span
                    className="p-1 text-xs font-bold cursor-pointer transiton hover:text-pink-500 hover:bg-pink-100 flex items-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(val);
                    }}
                >
                    &#10005;
                </span>
            </div>
        ));
    } else {
        labels = dataMap[values];
    }

    return (
        <div className="isolate relative w-full">
            <div
                className="border border-slate-200 bg-white rounded p-2 text-slate-600 flex items-center flex-wrap"
                onClick={() => toggleList(true)}
            >
                {labels}
            </div>
            {showList && (
                <div
                    className="absolute left-0 bg-white p-2 shadow rounded w-full"
                    style={{ top: "calc(100% + 4px)" }}
                >
                    <input
                        ref={queryRef}
                        type="text"
                        className="border border-slate-200 p-1 w-full rounded dropdown-query"
                        placeholder="type to search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <div
                        className="mt-2"
                        style={{ maxHeight: 200, overflowY: "auto" }}
                    >
                        <DropdownItem
                            displayText="None"
                            onClick={() => {
                                handleItemClick(null, -1);
                            }}
                        />
                        {data
                            .filter((d) =>
                                multiple
                                    ? !values.includes(d.value)
                                    : values !== d.value
                            )
                            .filter((d) =>
                                d.label
                                    .toLowerCase()
                                    .includes(query.toLowerCase())
                            )
                            .map((d, idx) => (
                                <DropdownItem
                                    key={`dropdown-${d.value}`}
                                    displayText={d.label}
                                    selected={idx === 0 && query}
                                    onClick={() => handleItemClick(d, idx)}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
