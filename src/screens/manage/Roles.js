import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
} from "./services/rolesService";
import RoleModal from "../../components/RoleModal";

const Roles = () => {
    const navigate = useNavigate();
    const hasHistory = window.history.length > 0;

    const [roles, setRoles] = useState([]);
    const [showModal, toggleModal] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        getRoles().then((response) => {
            const { roles } = response.data;
            setRoles(roles);
        });
    }, []);

    const resetData = () => {
        setId("");
        toggleModal(false);
    };

    const handleCreateRole = () => {
        setId("");
        toggleModal(true);
    };

    const handleItemClick = (item) => {
        setId(item.id);
        toggleModal(true);
    };

    const handleModalCancel = () => {
        resetData();
    };

    const handleSave = (role) => {
        if (id) {
            setRoles(
                roles.map((r) => {
                    if (r.id === role.id) {
                        return role;
                    }
                    return r;
                })
            );
        } else {
            setRoles([...roles, role]);
        }
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
                    <h1 className="text-3xl font-light">Roles</h1>
                    <button
                        onClick={handleCreateRole}
                        className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Create Role
                    </button>
                </div>
            </div>
            <div className="h-full mt-10 p-10 text-slate-600">
                <div className="flex flex-wrap">
                    {roles.map((p, idx) => {
                        return (
                            <div
                                key={`role-${idx}`}
                                onClick={() => handleItemClick(p)}
                                className="w-1/5 mr-6 mb-6 bg-white rounded-lg p-4 border border-transparent hover:border-teal-500 transition shadow hover:shadow-lg cursor-pointer"
                            >
                                <h3 className="text-xl">{p.name}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>
            <RoleModal
                show={showModal}
                onSave={handleSave}
                onCancel={handleModalCancel}
                id={id}
            />
        </div>
    );
};

export default Roles;
