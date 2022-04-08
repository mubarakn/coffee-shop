import { useState } from "react";
import Button from "../../components/Button";

const ReceiptSettings = () => {
    const [printLanguage, setPrintLanguage] = useState("Main");
    const [printMainLanguage, setPrintMainLanguage] = useState("English");
    const [printLocalizedLanguage, setPrintLocalizedLanaguage] = useState("");
    const [receiptHeader, setReceiptHeader] = useState("");
    const [receiptFooter, setReceiptFooter] = useState("");
    const [invoiceTitle, setInvoiceTitle] = useState("Simplified Tax Invoice");
    const [showOrderNo, toggleOrderNo] = useState(true);
    const [showSubtotal, toggleSubtotal] = useState(false);
    const [showRounding, toggleRounding] = useState(true);

    const handleSaveChanges = () => {};

    return (
        <div className="w-2/4">
            <h3 className="mb-4 font-light">Receipt Settings</h3>
            <div className="bg-white p-4 shadow rounded">
                <div className="">
                    <label className="font-light block text-slate-600">
                        Print Language
                    </label>
                    <select
                        value={printLanguage}
                        onChange={(e) => setPrintLanguage(e.target.value)}
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                    >
                        <option value="Main">Main</option>
                        <option value="Localized">Localized</option>
                        <option value="MainAndLocalized">
                            Main &amp; Localized
                        </option>
                    </select>
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Main Language
                    </label>
                    <select
                        value={printMainLanguage}
                        onChange={(e) => setPrintLanguage(e.target.value)}
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                    >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                    </select>
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Localized Language
                    </label>
                    <select
                        value={printLocalizedLanguage}
                        onChange={(e) =>
                            setPrintLocalizedLanaguage(e.target.value)
                        }
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                    >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                    </select>
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Receipt Header
                    </label>
                    <textarea
                        rows={3}
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={receiptHeader}
                        onChange={(e) => setReceiptHeader(e.target.value)}
                    ></textarea>
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Receipt Footer
                    </label>
                    <textarea
                        rows={3}
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={receiptFooter}
                        onChange={(e) => setReceiptFooter(e.target.value)}
                    ></textarea>
                </div>

                <div className="mt-4">
                    <label className="font-light block text-slate-600">
                        Invoice Title
                    </label>
                    <input
                        type="text"
                        className="block mt-1 border border-slate-200 w-full rounded-lg py-1 px-2 font-light"
                        value={invoiceTitle}
                        onChange={(e) => setInvoiceTitle(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <label className="flex items-center text-slate-600 font-light">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={showOrderNo}
                            onChange={() => toggleOrderNo(!showOrderNo)}
                        />
                        Show Order Number
                    </label>

                    <label className="flex items-center text-slate-600 font-light mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={showSubtotal}
                            onChange={() => toggleSubtotal(!showSubtotal)}
                        />
                        Show Subtotal
                    </label>

                    <label className="flex items-center text-slate-600 font-light mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 rounded p-1"
                            checked={showRounding}
                            onChange={() => toggleRounding(!showRounding)}
                        />
                        Show Rounding
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

export default ReceiptSettings;
