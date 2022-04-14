import { useState } from "react";
import Button from "../../components/Button";
import { updateCashierSettings } from "./services/settingsService";

const CashierAppSettings = ({ data }) => {
    const [presetTenderAmounts, setPresetTenderAmounts] = useState(
        data.presetTenderAmounts || "50,100"
    );
    const [preferredTipsPercentages, setPreferredTipsPercentages] = useState(
        data.preferredTipsPercentages || ""
    );
    const [idleLogoutDuration, setIdleLogoutDuration] = useState(
        data.idleLogoutDuration || 30
    );
    const [maximumReturnPeriod, setMaximumReturnPeriod] = useState(
        data.maximumReturnPeriod || 60
    );
    const [roundingMethod, setRoundingMethod] = useState(
        data.maximumReturnPeriod || ""
    );
    const [roundingLevel, setRoundingLevel] = useState(
        data.roundingLevel || 0.1
    );
    const [kitchenSortingMethod, setKitchenSortingMethod] = useState(
        data.kitchenSortingMethod || "basedOnMenuCategoriesSorting"
    );
    const [enableTips, toggleTips] = useState(data.enableTips || false);
    const [discountRequireCustomerInfo, toggleDiscountRequireCustomerInfo] =
        useState(data.discountRequireCustomerInfo || false);
    const [voidRequireCustomerInfo, toggleVoidRequireCustomerInfo] = useState(
        data.voidRequireCustomerInfo || false
    );
    const [askForVoidReason, toggleAskForVoidReason] = useState(
        data.askForVoidReason || false
    );

    const handleSaveChanges = () => {
        const data = {
            presetTenderAmounts,
            preferredTipsPercentages,
            idleLogoutDuration,
            maximumReturnPeriod,
            roundingMethod,
            roundingLevel,
            kitchenSortingMethod,
            enableTips,
            discountRequireCustomerInfo,
            voidRequireCustomerInfo,
            askForVoidReason,
        };
        updateCashierSettings(data).then((response) => {
            if (response.status === 202) {
                alert("Changes Saved!");
            }
        });
    };

    return (
        <div className="w-2/4">
            <h3 className="mb-4 font-light">Cashier App Settings</h3>
            <div className="bg-white p-4 shadow rounded">
                <div className="">
                    <label className="font-light block text-slate-600">
                        Preset Tender Amounts
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={presetTenderAmounts}
                        onChange={(e) => setPresetTenderAmounts(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Preferred Tips Percentages
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={preferredTipsPercentages}
                        onChange={(e) =>
                            setPreferredTipsPercentages(e.target.value)
                        }
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Inactive Users Logout (Minute)
                    </label>
                    <input
                        type="number"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={idleLogoutDuration}
                        onChange={(e) => setIdleLogoutDuration(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Maximum Return Period (Minute)
                    </label>
                    <input
                        type="number"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={maximumReturnPeriod}
                        onChange={(e) => setMaximumReturnPeriod(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Rounding Method
                    </label>
                    <select
                        value={roundingMethod}
                        onChange={(e) => setRoundingMethod(e.target.value)}
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                    >
                        <option value="">None</option>
                        <option value="up">Up</option>
                        <option value="down">Down</option>
                        <option value="average">Average</option>
                    </select>
                </div>

                {roundingMethod !== "" && (
                    <div className="mt-4">
                        <label className="font-light block text-slate-600">
                            Rounding Level
                        </label>
                        <input
                            type="number"
                            className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                            value={roundingLevel}
                            onChange={(e) => setRoundingLevel(e.target.value)}
                        />
                    </div>
                )}

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Kitchen Sorting Method
                    </label>
                    <select
                        value={kitchenSortingMethod}
                        onChange={(e) =>
                            setKitchenSortingMethod(e.target.value)
                        }
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                    >
                        <option value="o">As added in the cashier</option>
                        <option value="1">
                            Based on menu categories sorting
                        </option>
                    </select>
                </div>

                <div className="mt-4">
                    <label className="flex items-center text-slate-600 font-light">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={enableTips}
                            onChange={() => toggleTips(!enableTips)}
                        />
                        Enable Tips
                    </label>

                    <label className="flex items-center text-slate-600 font-light mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={discountRequireCustomerInfo}
                            onChange={() =>
                                toggleDiscountRequireCustomerInfo(
                                    !discountRequireCustomerInfo
                                )
                            }
                        />
                        Discount Require Customer Info
                    </label>

                    <label className="flex items-center text-slate-600 font-light mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={voidRequireCustomerInfo}
                            onChange={() =>
                                toggleVoidRequireCustomerInfo(
                                    !voidRequireCustomerInfo
                                )
                            }
                        />
                        Void Require Customer Info
                    </label>

                    <label className="flex items-center text-slate-600 font-light mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={askForVoidReason}
                            onChange={() =>
                                toggleAskForVoidReason(!askForVoidReason)
                            }
                        />
                        Ask for Void Reasons
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

export default CashierAppSettings;
