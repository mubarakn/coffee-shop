import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import Label from "../../components/Label";
import Modal from "../../components/Modal";
import Dropdown from "../../components/Dropdown";
import { useEffect, useState } from "react";
import { getRoles } from "./services/rolesService";
import {
    getUser,
    assignRoles,
    assignBranches,
    assignTags,
    changePassword,
} from "./services/usersService";
import dayjs from "dayjs";
import { getBranches } from "./services/branchesService";
import { getTags } from "./services/tagsService";

const UserDetail = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const hasHistory = window.history.length > 0;

    const [showRolesModal, toggleRolesModal] = useState(false);
    const [showBranchesModal, toggleBranchesModal] = useState(false);
    const [showTagsModal, toggleTagsModal] = useState(false);
    const [roles, setRoles] = useState([]);
    const [rolesMap, setRolesMap] = useState({});
    const [branches, setBranches] = useState([]);
    const [branchesMap, setBranchesMap] = useState({});
    const [tags, setTags] = useState([]);
    const [tagsMap, setTagsMap] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [phone, setPhone] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [lastConsoleLogin, setLastConsoleLogin] = useState("");
    const [assignedRoles, setAssignedRoles] = useState([]);
    const [assignedBranches, setAssignedBranches] = useState([]);
    const [assignedTags, setAssignedTags] = useState([]);
    const [newRoles, setNewRoles] = useState([]);
    const [newBranches, setNewBranches] = useState([]);
    const [newTags, setNewTags] = useState([]);
    const [isAdmin, toggleAdmin] = useState(false);
    const [showChangePasswordModal, toggleChangePasswordModal] =
        useState(false);

    useEffect(() => {
        getUser(userId).then((response) => {
            const user = response.data;
            setName(user.name);
            setEmail(user.email || "");
            setEmployeeNumber(user.employeeNumber || "");
            setPhone(user.phone || "");
            setEmailVerified(user.emailVerified || false);
            setLastConsoleLogin(user.lastConsoleLogin);
            setAssignedRoles(user.roles);
            setAssignedBranches(user.branches);
            setAssignedTags(user.tags);
            toggleAdmin(user.isAdmin);
        });

        getRoles().then((response) => {
            const { roles } = response.data;
            setRoles(roles);
        });

        getBranches().then((response) => {
            const { branches } = response.data;
            setBranches(branches);
        });

        getTags("user").then((response) => {
            const { tags } = response.data;
            setTags(tags);
        });
    }, [userId]);

    useEffect(() => {
        const rolesMap = roles.reduce((acc, item) => {
            acc[item.id] = item.name;
            return acc;
        }, {});

        setRolesMap(rolesMap);
    }, [roles]);

    useEffect(() => {
        if (branches.length) {
            const branchesMap = branches.reduce((acc, item) => {
                acc[item.id] = `${item.name} (${item.code})`;
                return acc;
            }, {});
            setBranchesMap(branchesMap);
        }
    }, [branches]);

    useEffect(() => {
        if (tags.length) {
            const tagsMap = tags.reduce((acc, item) => {
                acc[item.id] = item.tag;
                return acc;
            }, {});
            setTagsMap(tagsMap);
        }
    }, [tags]);

    useEffect(() => {
        if (showRolesModal) {
            setNewRoles([...assignedRoles]);
        } else {
            setNewRoles([]);
        }
    }, [showRolesModal]);

    useEffect(() => {
        if (showBranchesModal) {
            setNewBranches([...assignedBranches]);
        } else {
            setNewBranches([]);
        }
    }, [showBranchesModal]);

    useEffect(() => {
        if (showTagsModal) {
            setNewTags([...assignedTags]);
        } else {
            setNewTags([]);
        }
    }, [showTagsModal]);

    const handleEditUser = () => {};

    const onRoleClick = () => {
        toggleRolesModal(true);
    };

    const handleAssignRoles = () => {
        toggleRolesModal(true);
    };

    const handleRoleSave = () => {
        setAssignedRoles(newRoles);
        setNewRoles([]);
        toggleRolesModal(false);
    };

    const handleRoleCancel = () => {
        setNewRoles([]);
        toggleRolesModal(false);
    };

    const handleOptionSelected = (role) => {
        setNewRoles([...newRoles, role.value]);
    };

    const handleOptionRemoved = (role) => {
        setNewRoles(newRoles.filter((r) => r !== role));
    };

    const handleBranchSave = () => {
        setAssignedBranches(newBranches);
        setNewBranches([]);
        toggleBranchesModal(false);
    };

    const handleBranchCancel = () => {
        setNewBranches([]);
        toggleBranchesModal(false);
    };

    const handleBranchSelected = (branch) => {
        setNewBranches([...newBranches, branch.value]);
    };

    const handleBranchRemoved = (branch) => {
        setNewBranches(newBranches.filter((b) => b !== branch));
    };

    const handleAssignBranches = () => {
        toggleBranchesModal(true);
    };

    const handleAssignTags = () => {
        toggleTagsModal(true);
    };

    const handleTagSave = () => {
        setAssignedTags(newTags);
        toggleTagsModal(false);
    };

    const handleTagCancel = () => {
        toggleTagsModal(false);
    };

    const handleTagSelected = (tag) => {
        setNewTags([...newTags, tag.value]);
    };

    const handleTagRemoved = (tag) => {
        setNewTags(newTags.filter((t) => t !== tag));
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
                    <h1 className="text-3xl font-light">{name}</h1>
                    <button
                        onClick={handleEditUser}
                        className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Notifications
                    </button>
                    <button
                        onClick={() => toggleChangePasswordModal(true)}
                        className="ml-2 font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={handleEditUser}
                        className="ml-2 font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Edit User
                    </button>
                </div>
            </div>

            <div className="h-full mt-10 p-10 text-slate-600 flex flex-col items-center">
                <div className="bg-white w-4/6 rounded-lg py-10">
                    <div className="px-10">
                        <div className="flex">
                            <div className="flex-1 mr-2 border-b border-slate-200 py-2">
                                <Label className="block">Name</Label>
                                <span>{name}</span>
                            </div>
                            <div className="flex-1 ml-2 border-b border-slate-200 py-2">
                                <Label className="block">Email</Label>
                                <span>{email}</span>
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex-1 mr-2 border-b border-slate-200 py-2">
                                <Label className="block">Employee Number</Label>
                                <span>{employeeNumber || "-"}</span>
                            </div>
                            <div className="flex-1 ml-2 border-b border-slate-200 py-2">
                                <Label className="block">Phone</Label>
                                <span>{phone || "-"}</span>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 mr-2 border-b border-slate-200 py-2">
                                <Label className="block">Email Verified</Label>
                                <span>{emailVerified ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex-1 ml-2 border-b border-slate-200 py-2">
                                <Label className="block">
                                    Last Console Login
                                </Label>
                                <span>
                                    {dayjs(lastConsoleLogin).format(
                                        "MMMM DD hh:mm a"
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {!isAdmin && (
                    <>
                        {/* Roles */}
                        <div className="w-4/6 mt-20">
                            <div className="flex items-center mb-2">
                                <h3 className="mb-4 font-light text-xl text-slate-700">
                                    Roles
                                </h3>
                                <button
                                    onClick={handleAssignRoles}
                                    className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                                >
                                    Assign Roles
                                </button>
                            </div>
                            <div>
                                {assignedRoles.map((role, i) => {
                                    return (
                                        <div
                                            key={`role-${i}`}
                                            onClick={() =>
                                                typeof onRoleClick ===
                                                    "function" && onRoleClick()
                                            }
                                            className={`p-3 bg-white border-b border-slate-100 cursor-pointer text-slate-600 font-light hover:bg-slate-50 ${
                                                i === 0 ? "rounded-t-lg" : ""
                                            }
                                        ${
                                            i === assignRoles.length - 1
                                                ? "rounded-b-lg"
                                                : ""
                                        }
                                        `}
                                        >
                                            {rolesMap[role]}
                                        </div>
                                    );
                                })}
                                <AssignRolesModal
                                    id={userId}
                                    roles={roles}
                                    show={showRolesModal}
                                    onSave={handleRoleSave}
                                    onCancel={handleRoleCancel}
                                    selectedValues={newRoles}
                                    onOptionSelected={handleOptionSelected}
                                    onOptionRemoved={handleOptionRemoved}
                                />
                            </div>
                        </div>

                        {/* Branches */}
                        <div className="w-4/6 mt-20">
                            <div className="flex items-center mb-2">
                                <h3 className="mb-4 font-light text-xl text-slate-700">
                                    Branches
                                </h3>
                                <button
                                    onClick={handleAssignBranches}
                                    className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                                >
                                    Assign Branches
                                </button>
                            </div>
                            <div>
                                {assignedBranches.map((branch, i) => {
                                    return (
                                        <div
                                            key={`branch-${i}`}
                                            onClick={() =>
                                                toggleBranchesModal(true)
                                            }
                                            className={`p-3 bg-white border-b border-slate-100 cursor-pointer text-slate-600 font-light hover:bg-slate-50 ${
                                                i === 0 ? "rounded-t-lg" : ""
                                            }
                                        ${
                                            i === assignedBranches.length - 1
                                                ? "rounded-b-lg"
                                                : ""
                                        }
                                        `}
                                        >
                                            {branchesMap[branch]}
                                        </div>
                                    );
                                })}
                                <AssignBranchesModal
                                    id={userId}
                                    branches={branches}
                                    show={showBranchesModal}
                                    onSave={handleBranchSave}
                                    onCancel={handleBranchCancel}
                                    selectedValues={newBranches}
                                    onOptionSelected={handleBranchSelected}
                                    onOptionRemoved={handleBranchRemoved}
                                />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="w-4/6 mt-20">
                            <div className="flex items-center mb-2">
                                <h3 className="mb-4 font-light text-xl text-slate-700">
                                    Tags
                                </h3>
                                <button
                                    onClick={handleAssignTags}
                                    className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                                >
                                    Assign Tags
                                </button>
                            </div>
                            <div>
                                {assignedTags.map((tag, i) => {
                                    return (
                                        <div
                                            key={`tag-${i}`}
                                            onClick={() =>
                                                toggleTagsModal(true)
                                            }
                                            className={`p-3 bg-white border-b border-slate-100 cursor-pointer text-slate-600 font-light hover:bg-slate-50 ${
                                                i === 0 ? "rounded-t-lg" : ""
                                            }
                                        ${
                                            i === assignedTags.length - 1
                                                ? "rounded-b-lg"
                                                : ""
                                        }
                                        `}
                                        >
                                            {tagsMap[tag]}
                                        </div>
                                    );
                                })}
                                <AssignTagsModal
                                    id={userId}
                                    tags={tags}
                                    show={showTagsModal}
                                    onSave={handleTagSave}
                                    onCancel={handleTagCancel}
                                    selectedValues={newTags}
                                    onOptionSelected={handleTagSelected}
                                    onOptionRemoved={handleTagRemoved}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <ChangePasswordModal
                id={userId}
                show={showChangePasswordModal}
                onSave={() => toggleChangePasswordModal(false)}
                onCancel={() => toggleChangePasswordModal(false)}
            />
        </div>
    );
};

export default UserDetail;

const AssignRolesModal = ({
    id,
    roles,
    show,
    onSave,
    onCancel,
    selectedValues,
    onOptionSelected,
    onOptionRemoved,
}) => {
    const handleSave = () => {
        assignRoles(id, selectedValues).then((response) => {
            if (response.status === 202) {
                typeof onSave === "function" && onSave();
            }
        });
    };

    return (
        <Modal
            show={show}
            onSave={handleSave}
            onCancel={onCancel}
            title="Assign Roles"
        >
            <div>
                <Label>Select Roles</Label>
                <Dropdown
                    data={roles.map((r) => ({ label: r.name, value: r.id }))}
                    onOptionRemoved={onOptionRemoved}
                    onOptionSelected={onOptionSelected}
                    selectedValue={selectedValues}
                    multiple
                />
            </div>
        </Modal>
    );
};

const AssignBranchesModal = ({
    id,
    branches,
    show,
    onSave,
    onCancel,
    selectedValues,
    onOptionSelected,
    onOptionRemoved,
}) => {
    const handleSave = () => {
        assignBranches(id, selectedValues).then((response) => {
            if (response.status === 202) {
                typeof onSave === "function" && onSave();
            }
        });
    };

    return (
        <Modal
            show={show}
            onSave={handleSave}
            onCancel={onCancel}
            title="Assign Branches"
        >
            <div>
                <Label>Select Branches</Label>
                <Dropdown
                    data={branches
                        .filter((b) => !selectedValues.includes(b.id))
                        .map((r) => ({
                            label: `${r.name} (${r.code})`,
                            value: r.id,
                        }))}
                    onOptionRemoved={onOptionRemoved}
                    onOptionSelected={onOptionSelected}
                    selectedValue={selectedValues}
                    multiple
                />
            </div>
        </Modal>
    );
};

const AssignTagsModal = ({
    id,
    tags,
    show,
    onSave,
    onCancel,
    selectedValues,
    onOptionSelected,
    onOptionRemoved,
}) => {
    const handleSave = () => {
        assignTags(id, selectedValues).then((response) => {
            if (response.status === 202) {
                typeof onSave === "function" && onSave();
            }
        });
    };

    return (
        <Modal
            show={show}
            onSave={handleSave}
            onCancel={onCancel}
            title="Assign Tags"
        >
            <div>
                <Label>Select Tags</Label>
                <Dropdown
                    data={tags
                        .filter((t) => !selectedValues.includes(t.id))
                        .map((t) => ({ label: t.tag, value: t.id }))}
                    onOptionRemoved={onOptionRemoved}
                    onOptionSelected={onOptionSelected}
                    selectedValue={selectedValues}
                    multiple
                />
            </div>
        </Modal>
    );
};

const ChangePasswordModal = ({ id, show, onSave, onCancel }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        setPassword("");
        setConfirmPassword("");
    }, []);

    const handleSave = () => {
        if (password.length && password === confirmPassword) {
            changePassword(id, password).then((response) => {
                if (response.status === 202) {
                    typeof onSave === "function" && onSave();
                }
            });
        }
    };

    return (
        <Modal
            show={show}
            onSave={handleSave}
            onCancel={onCancel}
            title="Change Password"
        >
            <div>
                <Label>Password</Label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                />
            </div>
            <div className="mt-4">
                <Label>Confirm Password</Label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                />
            </div>
        </Modal>
    );
};
