import { useNavigate } from "react-router-dom";

const SupplierList = ({ suppliers }) => {
    const navigate = useNavigate();

    const handleItemClick = (id) => {
        navigate(id);
    };

    return (
        <div className="flex rounded justify-center">
            <div className="bg-white w-10/12 mt-10 p-4 rounded shadow">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-10">
                                <input type="checkbox" />
                            </th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Contact Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((item) => {
                            return (
                                <tr
                                    key={`item-${item.id}`}
                                    className="cursor-pointer hover:bg-slate-100"
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    <td className="w-10 text-center p-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="text-center">{item.code}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">
                                        {item.contactName}
                                    </td>
                                    <td className="text-center">
                                        {item.phone}
                                    </td>
                                    <td className="text-center">
                                        {item.email}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupplierList;
