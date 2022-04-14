import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getUsers } from "./services/usersService";
import UserModal from "../../components/UserModal";

const Users = () => {
    const [show, toggleModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [taxGroups, setTaxGroups] = useState([]);
    const [taxGroupObj, setTaxGroupObj] = useState({});
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const hasHistory = window.history.length > 0;

    useEffect(() => {
        getUsers().then((response) => {
            const { users } = response.data;
            setUsers(users);
        });
    }, []);

    const resetData = () => {
        setId("");
        toggleModal(false);
    };

    const handleItemClick = (user) => {
        navigate(`${user.id}`);
        //setId(user.id);
        //toggleModal(true);
    };

    const handleOnCreate = () => {
        resetData();
        toggleModal(true);
    };

    const handleBranchSave = (user) => {
        if (id) {
            setUsers(
                users.map((u) => {
                    if (u.id === user.id) {
                        return user;
                    }
                    return u;
                })
            );
        } else {
            setUsers([...users, user]);
        }
        resetData();
    };

    const handleUserCancel = () => {
        resetData();
    };

    const handleUserDelete = () => {
        setUsers(users.filter((u) => u.id !== id));
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
                    <h1 className="text-3xl font-light">Users</h1>
                    <button
                        onClick={handleOnCreate}
                        className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                    >
                        Create User
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
                                <th className="text-left p-4">Name</th>
                                <th className="text-left p-4">
                                    Console Access
                                </th>
                                <th className="text-left p-4">App access</th>
                                <th className="text-left p-4">Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => {
                                return (
                                    <tr
                                        key={`charge-${idx}`}
                                        onClick={() => handleItemClick(user)}
                                        className="cursor-pointer hover:bg-slate-100"
                                    >
                                        <td className="text-center p-4">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="p-4">{user.name}</td>
                                        <td className="p-4">
                                            <div
                                                className={`rounded-full h-4 w-4 ${
                                                    user.email
                                                        ? "bg-teal-500"
                                                        : "bg-pink-500"
                                                }`}
                                            ></div>
                                        </td>
                                        <td className="p-4">
                                            <div
                                                className={`rounded-full h-4 w-4 ${
                                                    user.loginPin
                                                        ? "bg-teal-500"
                                                        : "bg-pink-500"
                                                }`}
                                            ></div>
                                        </td>
                                        <td></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <UserModal
                show={show}
                onSave={handleBranchSave}
                onCancel={handleUserCancel}
                onDelete={handleUserDelete}
                id={id}
            />
        </div>
    );
};

export default Users;
