import { useEffect, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const MasterHeader = () => {
    const profileRef = useRef(null);
    const dropdownRef = useRef(null);
    const [showProfileOption, toggleProfileOption] = useState(false);

    useEffect(() => {
        if (showProfileOption) {
            const rect = profileRef.current.getBoundingClientRect();
            const style = dropdownRef.current.style;
            style.top = `${rect.top + rect.height + 10}px`;
            style.left = `calc(${rect.left}px - 11rem)`;
        }
    }, [showProfileOption]);

    return (
        <div className="bg-white flex items-center border-b border-slate-300">
            <h1 className="text-3xl text-slate-700 w-72 border-r border-slate-300 p-4 text-center font-bold uppercase">
                Kaafi
            </h1>
            <div className="flex-1 px-10">
                <div className="w-fit ml-auto relative" ref={profileRef}>
                    <FaRegUserCircle
                        onClick={() => toggleProfileOption(!showProfileOption)}
                        size={24}
                        className="text-slate-500 cursor-pointer hover:text-black"
                    />

                    {showProfileOption && (
                        <div
                            ref={dropdownRef}
                            className="fixed w-52 bg-white rounded shadow py-1"
                        >
                            <Link
                                to="/profile"
                                className="p-4 block hover:underline"
                            >
                                Manage Profile
                            </Link>
                            <Link
                                to="/logout"
                                className="p-4 block hover:bg-pink-500 hover:text-white"
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MasterHeader;
