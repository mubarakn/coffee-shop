import { Link } from "react-router-dom";
import Page from "./Page";

const ManageButton = ({ link, name }) => {
    return (
        <Link
            to={link}
            className="bg-white px-4 py-2 mt-4 mr-4 w-1/5 shadow h-24 flex items-center justify-center rounded hover:shadow-lg transition text-slate-600 hover:text-teal-500"
        >
            {name}
        </Link>
    );
};

const buttons = [
    { link: "/manage/taxes", name: "Taxes & Groups" },
    { link: "/manage/payment-methods", name: "Payment Methods" },
    { link: "/manage/charges", name: "Charges" },
    // { link: "/manage/delivery-zones", name: "Delivery Zones" },
    { link: "/manage/tags", name: "Tags" },
    { link: "/manage/reasons", name: "Reasons" },
    // { link: "/manage/reservations", name: "Reservations" },
    { link: "/manage/settings#general", name: "Settings" },
];

const ManageMore = () => {
    return (
        <Page title="Manage">
            <div className="flex space-between flex-wrap p-10">
                {buttons.map((button, i) => (
                    <ManageButton key={`manage-${i}`} {...button} />
                ))}
            </div>
        </Page>
    );
};

export default ManageMore;
