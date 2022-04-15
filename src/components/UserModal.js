import Modal from "./Modal";
import Label from "./Label";
import { useEffect, useRef, useState } from "react";
import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../screens/manage/services/usersService";

const BranchModal = ({ show, id, onSave, onCancel, onDelete }) => {
    const nameRef = useRef(null);
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("English");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginPin, setLoginPin] = useState("");

    const resetData = () => {
        setName("");
        setLanguage("");
        setEmail("");
        setPassword("");
        setLoginPin("");
    };

    useEffect(() => {
        if (show) {
            nameRef.current.focus();
        }
    }, [show]);

    const handleDelete = () => {
        deleteUser(id).then((response) => {
            if (response.status === 204) {
                if (typeof onDelete === "function") {
                    onDelete();
                }
            }
        });
    };

    useEffect(() => {
        if (id) {
            getUser(id).then((response) => {
                const user = response.data;
                setName(user.name);
                setLanguage(user.language);
                setEmail(user.email);
            });
        }
    }, [id]);

    const triggerSave = () => {
        if (typeof onSave === "function") {
            onSave({
                id,
                name,
                language,
                email,
            });
        }
        resetData();
    };

    const handleSave = () => {
        if (id) {
            updateUser(id, name, language, email).then((response) => {
                if (response.status === 202) {
                    triggerSave();
                }
            });
        } else {
            createUser(name, language, email, password, loginPin).then(
                (response) => {
                    if (response.status === 201) {
                        triggerSave();
                    }
                }
            );
        }
    };

    const handleCancel = () => {
        resetData();
        if (typeof onCancel === "function") {
            onCancel();
        }
    };

    return (
        <Modal
            show={show}
            title={id ? "Edit User" : "Create User"}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete User"}
        >
            <div className="max-h-[70vh] overflow-y-scroll">
                <div className="mb-4">
                    <Label>Name</Label>
                    <input
                        ref={nameRef}
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label>Language</Label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                    </select>
                </div>
                <div className="mb-4">
                    <Label>Email</Label>
                    <input
                        type="text"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {!id && (
                    <div className="mb-4">
                        <Label>Password</Label>
                        <input
                            type="text"
                            className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                )}
                <div className="mb-4">
                    <Label>Login Pin</Label>
                    <input
                        type="number"
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                        value={loginPin}
                        onChange={(e) => setLoginPin(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default BranchModal;
