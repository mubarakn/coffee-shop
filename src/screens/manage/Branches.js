import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getBranches } from "./services/branchesService";
import { getTaxGroups } from "./services/taxesService";
import BranchModal from "../../components/BranchModal";
import dayjs from "dayjs";

const Branches = () => {
    const [show, toggleModal] = useState(false);
    const [branches, setBranches] = useState([]);
    const [taxGroups, setTaxGroups] = useState([]);
    const [taxGroupObj, setTaxGroupObj] = useState({});
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const hasHistory = window.history.length > 0;

    useEffect(() => {
        getTaxGroups().then((response) => {
            const { taxGroups } = response.data;
            setTaxGroups(taxGroups);
        });

        getBranches().then((response) => {
            const { branches } = response.data;
            setBranches(branches);
        });
    }, []);

    useEffect(() => {
        const taxGroupObj = taxGroups.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = item.name;
            }
            return acc;
        }, {});
        setTaxGroupObj(taxGroupObj);
    }, [taxGroups]);

    const resetData = () => {
        setId("");
        toggleModal(false);
    };

    const handleItemClick = (branch) => {
        setId(branch.id);
        toggleModal(true);
    };

    const handleOnCreate = () => {
        resetData();
        toggleModal(true);
    };

    const handleBranchSave = (branch) => {
        if (id) {
            setBranches(
                branches.map((b) => {
                    if (b.id === branch.id) {
                        return branch;
                    }
                    return b;
                })
            );
        } else {
            setBranches([...branches, branch]);
        }
        resetData();
    };

    const handleBranchCancel = () => {
        resetData();
    };

    const handleBranchDelete = () => {
        setBranches(branches.filter((b) => b.id !== id));
        resetData();
    };

    return (
        <div className="w-full h-full">
            <div className="bg-white px-10 py-6">
                {hasHistory && (
                    <button
                        className="flex items-center text-slate-600 hover:text-slate-700"
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineLeft className="mr-1" />
                        <span className="font-light">Back</span>
                    </button>
                )}
                <div className="flex">
                    <h1 className="text-3xl font-light">Branches</h1>
                    <button
                        onClick={handleOnCreate}
                        className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Create Branch
                    </button>
                </div>
            </div>
            <div className="h-full mt-10 p-10 text-slate-600">
                <div className="bg-white rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-200">
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th className="text-left p-4">Code</th>
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">Tax Group</th>
                                <th className="text-left p-4">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map((branch, idx) => {
                                return (
                                    <tr
                                        key={`charge-${idx}`}
                                        onClick={() => handleItemClick(branch)}
                                        className="cursor-pointer hover:bg-slate-100"
                                    >
                                        <td className="text-center p-4">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="p-4">{branch.code}</td>
                                        <td className="p-4">{branch.name}</td>
                                        <td className="p-4">
                                            <div className="flex">
                                                {branch.taxGroups.map(
                                                    (t, tId) => (
                                                        <div
                                                            key={`b-${idx}-${tId}`}
                                                            className="mr-1 border px-2 py-1 rounded-lg"
                                                        >
                                                            {taxGroupObj[t]}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {dayjs(branch.created).format(
                                                "MMMM DD, hh:mma"
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <BranchModal
                show={show}
                onSave={handleBranchSave}
                onCancel={handleBranchCancel}
                onDelete={handleBranchDelete}
                id={id}
            />
        </div>
    );
};

export default Branches;
