import { Link, useNavigate, useLocation } from "react-router-dom";

import GeneralSettings from "./GeneralSettings";
import LoyaltySettings from "./LoyaltySettings";
import ReceiptSettings from "./ReceiptSettings";
import CashierAppSettings from "./CashierAppSettings";
import Page from "../Page";
import { useEffect, useState } from "react";
import { getSettings } from "./services/settingsService";

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
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        getSettings().then((response) => {
            const data = response.data;
            setCompanyData(data);
        });
    }, []);

    return (
        <Page
            back
            title="Settings"
            links={
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
            }
        >
            {companyData && (
                <div className="mt-10 flex justify-center">
                    {location.hash === "#general" && (
                        <GeneralSettings data={companyData} />
                    )}
                    {location.hash === "#loyalty" && (
                        <LoyaltySettings data={companyData} />
                    )}
                    {location.hash === "#receipt" && (
                        <ReceiptSettings data={companyData} />
                    )}
                    {location.hash === "#cashier" && (
                        <CashierAppSettings data={companyData} />
                    )}
                </div>
            )}
        </Page>
    );
};

export default Settings;
