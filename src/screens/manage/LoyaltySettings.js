import { useState } from "react";
import Button from "../../components/Button";
import { updateLoyaltySettings } from "./services/settingsService";

const LoyaltySettings = ({ data }) => {
    const [enableLoyalty, toggleLoyalty] = useState(data.enableLoyalty);
    const [loyaltyMethod, setLoyaltyMethod] = useState(
        data.loyaltyMethod || "Points"
    );
    const [minimumOrderPrice, setMinimumOrderPrice] = useState(
        data.minimumOrderPrice || 1
    );
    const [earningDelay, setEarningDelay] = useState(data.earningDelay || 60);
    const [rewardType, setRewardType] = useState(
        data.rewardType || "discountPercentage"
    ); //discountPercentage, discountAmount
    const [rewardValue, setRewardValue] = useState(data.rewardValue || 10);
    const [maximumDiscountAmount, setMaximumDiscountAmount] = useState(
        data.maximumDiscountAmount || 0
    );
    const [requiredRewards, setRequiredRewards] = useState(
        data.requiredRewardPoints || 0
    );
    const [sendNotificationBySMS, toggleSendNotificationBySMS] = useState(
        data.sendNotificationBySMS || false
    );

    const handleSaveChanges = () => {
        const data = {
            enableLoyalty,
            loyaltyMethod,
            minimumOrderPrice,
            earningDelay,
            rewardType,
            rewardValue,
            maximumDiscountAmount,
            requiredRewards,
            sendNotificationBySMS,
        };
        updateLoyaltySettings(data).then((response) => {
            if (response.status === 202) {
                alert("Changes Saved!");
            }
        });
    };

    return (
        <div className="w-2/4">
            <h3 className="mb-4 font-light">Loyalty Settings</h3>
            <div className="bg-white p-4 shadow rounded">
                <label className="flex items-center text-slate-600 font-light mt-2">
                    <input
                        type="checkbox"
                        className="mr-2 rounded p-1"
                        checked={enableLoyalty}
                        onChange={() => toggleLoyalty(!enableLoyalty)}
                    />
                    Enable Loyalty
                </label>
                {enableLoyalty && (
                    <>
                        <div className="mt-6">
                            <label className="font-light block text-slate-600">
                                Loyalty Method
                            </label>
                            <select
                                value={loyaltyMethod}
                                onChange={(e) =>
                                    setLoyaltyMethod(e.target.value)
                                }
                                className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                            >
                                <option value="Points">Points</option>
                                <option value="Punches">Punches</option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label className="font-light block text-slate-600">
                                Minimum Order price (SAR)
                            </label>
                            <input
                                type="number"
                                className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                                value={minimumOrderPrice}
                                onChange={(e) =>
                                    setMinimumOrderPrice(e.target.value)
                                }
                            />
                        </div>

                        <div className="mt-4">
                            <label className="font-light block text-slate-600">
                                Earning Delay (Minute)
                            </label>
                            <input
                                type="number"
                                className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                                value={earningDelay}
                                onChange={(e) =>
                                    setEarningDelay(e.target.value)
                                }
                            />
                        </div>

                        <div className="mt-4">
                            <label className="font-light block text-slate-600">
                                Reward Type
                            </label>
                            <select
                                value={rewardType}
                                onChange={(e) => setRewardType(e.target.value)}
                                className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                            >
                                <option value="discountPercentage">
                                    Discount Percentage
                                </option>
                                <option value="discountAmount">
                                    Discount Amount
                                </option>
                            </select>
                        </div>

                        <div className="mt-4">
                            <label className="font-light block text-slate-600">
                                Reward Value (
                                {rewardType === "discountPercentage"
                                    ? "%"
                                    : "SAR"}
                                )
                            </label>
                            <input
                                type="number"
                                className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                                value={rewardValue}
                                onChange={(e) => setRewardValue(e.target.value)}
                            />
                        </div>

                        {rewardType === "discountPercentage" && (
                            <div className="mt-4">
                                <label className="font-light block text-slate-600">
                                    Maximum Discount Amount (SAR)
                                </label>
                                <input
                                    type="number"
                                    className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                                    value={maximumDiscountAmount}
                                    onChange={(e) =>
                                        setMaximumDiscountAmount(e.target.value)
                                    }
                                />
                            </div>
                        )}

                        <div className="mt-4">
                            <label className="font-light block text-slate-600">
                                Required Reward {loyaltyMethod}
                            </label>
                            <input
                                type="number"
                                className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                                value={requiredRewards}
                                onChange={(e) =>
                                    setRequiredRewards(e.target.value)
                                }
                            />
                        </div>

                        <div className="mt-4">
                            <label className="flex items-center text-slate-600 font-light">
                                <input
                                    type="checkbox"
                                    className="mr-2 rounded p-1"
                                    checked={sendNotificationBySMS}
                                    onChange={() =>
                                        toggleSendNotificationBySMS(
                                            !sendNotificationBySMS
                                        )
                                    }
                                />
                                Send Notification By SMS
                            </label>
                        </div>
                    </>
                )}

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

export default LoyaltySettings;
