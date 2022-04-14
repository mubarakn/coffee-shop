import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import { updateGeneralSettings } from "./services/settingsService";

const GeneralSettings = ({ data }) => {
    const [country, setCountry] = useState(data.country.name);
    const [currency, setCurrency] = useState(data.country.currencyCode);
    const [businessName, setBusinessName] = useState(data.name);
    const [taxRegistrationName, setTaxRegistrationName] = useState(
        data.taxRegistrationName || ""
    );
    const [taxNumber, setTaxNumber] = useState(data.taxNumber || "");
    const [taxInclusivePricing, toggleTaxInclusivePricing] = useState(
        data.taxInclusivePricing
    );
    const [enableLocalization, toggleLocalization] = useState(
        data.enableLocalization
    );

    const handleSaveChanges = () => {
        const data = {
            businessName,
            taxRegistrationName,
            taxNumber,
            taxInclusivePricing,
            enableLocalization,
        };
        updateGeneralSettings(data).then((response) => {
            if (response.status === 202) {
                alert("Changes Saved!");
            }
        });
    };

    return (
        <div className="w-2/4">
            <h3 className="mb-4 font-light">General Settings</h3>
            <div className="bg-white p-4 shadow rounded-lg">
                <div className="">
                    <label className="font-light block text-slate-600">
                        Country
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={country}
                        readOnly
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Currency
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={currency}
                        readOnly
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Business Name
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Tax Registration Name
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={taxRegistrationName}
                        onChange={(e) => setTaxRegistrationName(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Tax Number
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={taxNumber}
                        onChange={(e) => setTaxNumber(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="flex items-center text-slate-600 font-light">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={taxInclusivePricing}
                            onChange={() =>
                                toggleTaxInclusivePricing(!taxInclusivePricing)
                            }
                        />
                        Tax Inclusive Pricing
                    </label>

                    <label className="flex items-center text-slate-600 font-light mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={enableLocalization}
                            onChange={() =>
                                toggleLocalization(!enableLocalization)
                            }
                        />
                        Enable Localization
                    </label>
                </div>

                <Button
                    title="Save Changes"
                    className="ml-auto block mt-4"
                    onClick={handleSaveChanges}
                    primary
                />
            </div>
        </div>
    );
};

export default GeneralSettings;
