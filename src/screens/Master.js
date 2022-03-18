import { Link } from "react-router-dom";

const Master = ({ children }) => {
    return (
        <div className="h-full w-full flex bg-slate-200">
            <div className="w-48 bg-white">
                <ul className="w-full">
                    <li className="font-semibold text-slate-700 text-center p-2">
                        Sales
                    </li>
                    <li className="w-full">
                        <Link
                            to="/order"
                            className="block p-2 w-full border-b border-slate-200 hover:text-teal-500 transition"
                        >
                            Order
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/categories"
                            className="block p-2 w-full border-b border-slate-200 hover:text-teal-500 transition"
                        >
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            className="block p-2 w-full border-b border-slate-200 hover:text-teal-500 transition"
                        >
                            Products
                        </Link>
                    </li>
                </ul>

                <ul className="w-full mt-4">
                    <li className="font-semibold text-slate-700 text-center p-2">
                        Inventory
                    </li>
                    <li className="w-full">
                        <Link
                            to="/items"
                            className="block p-2 w-full border-b border-slate-200 hover:text-teal-500 transition"
                        >
                            Items
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
        </div>
    );
};

export default Master;
