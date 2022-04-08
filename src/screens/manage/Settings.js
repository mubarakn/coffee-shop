import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

import GeneralSettings from "./GeneralSettings";
import LoyaltySettings from "./LoyaltySettings";
import ReceiptSettings from "./ReceiptSettings";
import CashierAppSettings from "./CashierAppSettings";

const SettingLink = ({ hash, title }) => {
    const location = useLocation();
    return (
        <Link
            to={hash}
            className={`mr-6 border-b-2 pb-2 text-sm w-fit ${
                hash === location.hash
                    ? "border-teal-500 text-teal-500 "
                    : "border-transparent font-light"
            }`}
        >
            {title}
        </Link>
    );
};

const Settings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hasHistory = window.history.length > 0;

    return (
        <div className="w-full h-full">
            <div className="bg-white px-10 py-2">
                {hasHistory && (
                    <button
                        className="flex items-center text-slate-600 hover:text-slate-700"
                        onClick={() => navigate("/manage/more")}
                    >
                        <AiOutlineLeft className="mr-1" />
                        <span className="font-light">Back</span>
                    </button>
                )}
                <h1 className="text-3xl font-light">Settings</h1>
                <ul className="mt-4 flex">
                    <li>
                        <SettingLink hash="#general" title="General" />
                    </li>
                    <li>
                        <SettingLink hash="#loyalty" title="Loyalty" />
                    </li>
                    <li>
                        <SettingLink hash="#receipt" title="Receipt" />
                    </li>
                    <li>
                        <SettingLink hash="#cashier" title="Cashier App" />
                    </li>
                </ul>
            </div>
            <div className="flex h-full mt-10 justify-center">
                {location.hash === "#general" && <GeneralSettings />}
                {location.hash === "#loyalty" && <LoyaltySettings />}
                {location.hash === "#receipt" && <ReceiptSettings />}
                {location.hash === "#cashier" && <CashierAppSettings />}
            </div>
        </div>
    );
};

export default Settings;
