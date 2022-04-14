import { useCallback, useEffect, useRef, useState } from "react";

const DropdownItem = ({ selected, displayText, onClick }) => {
    return (
        <div
            className={`p-1 bg-white hover:bg-slate-50 rounded cursor-pointer text-slate-600 text-sm border-b border-slate-50 py-2
            ${selected && "bg-slate-50"}`}
            onClick={() => typeof onClick === "function" && onClick()}
        >
            {displayText}
        </div>
    );
};

const Dropdown = ({
    data,
    onOptionSelected,
    multiple,
    selectedValue,
    onOptionRemoved,
}) => {
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const queryRef = useRef(null);
    const [query, setQuery] = useState("");
    const [showList, toggleList] = useState(false);
    const [dataMap, setDataMap] = useState({});
    const [values, setValues] = useState(null);

    useEffect(() => {
        document.body.style.overflowY = "hidden";

        return () => (document.body.style.overflowY = "initial");
    }, []);

    useEffect(() => {
        if (data.length) {
            const dataMap = data.reduce((acc, item) => {
                if (!acc[item.value]) {
                    acc[item.value] = item.label;
                }
                return acc;
            }, {});
            setDataMap(dataMap);
        }
    }, [data]);

    useEffect(() => {
        setValues(
            multiple
                ? Array.isArray(selectedValue)
                    ? selectedValue
                    : []
                : selectedValue
        );
    }, [selectedValue, multiple]);

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

    const handleItemClick = (item) => {
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
            if (typeof onOptionRemoved === "function") {
                onOptionRemoved(value);
            }
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

    useEffect(() => {
        if (showList) {
            const rect = dropdownRef.current.getBoundingClientRect();
            listRef.current.style.width = `${rect.width}px`;
            listRef.current.style.top = `${rect.top + 50}px`;
            listRef.current.style.left = `${rect.left}px`;
        }
    }, [showList]);

    return (
        <div className="w-full" ref={dropdownRef}>
            <div
                className="border border-slate-200 bg-white rounded p-2 text-slate-600 flex items-center flex-wrap"
                onClick={() => toggleList(true)}
            >
                {labels}
            </div>
            {showList && (
                <div
                    ref={listRef}
                    className="fixed bg-white p-2 shadow rounded"
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
                                handleItemClick(null);
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
                                    onClick={() => handleItemClick(d)}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
