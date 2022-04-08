import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import Accordion from "../components/Accordion";

const MasterSidebar = () => {
    return (
        <div className="w-72 bg-white border-r border-slate-300">
            {/* <ul className="w-full">
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
            </ul> */}

            {/* Manage */}
            <Accordion
                header={
                    <div className="flex items-center text-slate-500">
                        <AiOutlineSetting size={24} />
                        <span className="ml-2">Manage</span>
                    </div>
                }
            >
                <ul className="ml-8 mt-4">
                    <li>
                        <Link
                            to="/manage/more"
                            className="text-slate-600 hover:underline"
                        >
                            More...
                        </Link>
                    </li>
                </ul>
            </Accordion>
        </div>
    );
};

export default MasterSidebar;
