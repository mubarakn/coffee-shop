import { Link } from "react-router-dom";

const ManageButton = ({ link, name }) => {
    return (
        <Link
            to={link}
            className="bg-white px-4 py-2 mt-4 mr-1 w-1/5 shadow h-24 flex items-center justify-center rounded hover:shadow-lg transition text-slate-600 hover:text-teal-500"
        >
            {name}
        </Link>
    );
};

const buttons = [
    { link: "/manage/taxes", name: "Taxes & Groups" },
    { link: "/manage/payement-methods", name: "Payment Methods" },
    { link: "/manage/charges", name: "Charges" },
    { link: "/manage/delivery-zones", name: "Delivery Zones" },
    { link: "/manage/tags", name: "Tags" },
    { link: "/manage/reasons", name: "Reasons" },
    { link: "/manage/reservations", name: "Reservations" },
    { link: "/manage/settings#general", name: "Settings" },
];

const ManageMore = () => {
    return (
        <div>
            <div className="bg-white p-4">
                <h2 className="mx-4 text-3xl text-slate-600">Manage</h2>
            </div>
            <div className="flex space-between flex-wrap justify-evenly">
                {buttons.map((button, i) => (
                    <ManageButton key={`manage-${i}`} {...button} />
                ))}
            </div>
        </div>
    );
};

export default ManageMore;
