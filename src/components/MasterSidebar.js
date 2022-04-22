import { Link, useLocation } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import Accordion from "../components/Accordion";

const SidebarLink = ({ link, title }) => {
    return (
        <Link
            to={link}
            className="text-slate-600 hover:text-cyan-500 hover:underline"
        >
            {title}
        </Link>
    );
};

const MasterSidebar = () => {
    const location = useLocation();
    const pathnameParts = location.pathname.slice(1).split("/");
    const manageMatch =
        pathnameParts.length > 1 && pathnameParts[0] === "manage";

    const inventoryMatch =
        pathnameParts.length > 1 && pathnameParts[0] === "inventory";

    const menuMatch = pathnameParts.length > 1 && pathnameParts[0] === "menu";

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

            {/* Inventory */}
            <Accordion
                expand={inventoryMatch}
                header={
                    <div className="flex items-center text-slate-500">
                        <AiOutlineSetting size={24} />
                        <span className="ml-2">Inventory</span>
                    </div>
                }
            >
                <ul className="ml-8 mt-4">
                    <li className="mb-4">
                        <SidebarLink
                            link="/inventory/categories"
                            title="Categories"
                        />
                    </li>
                    <li className="mb-4">
                        <SidebarLink link="/inventory/items" title="Items" />
                    </li>
                    <li className="mb-4">
                        <SidebarLink
                            link="/inventory/suppliers"
                            title="Suppliers"
                        />
                    </li>
                </ul>
            </Accordion>

            {/* Menu */}
            <Accordion
                expand={menuMatch}
                header={
                    <div className="flex items-center text-slate-500">
                        <AiOutlineSetting size={24} />
                        <span className="ml-2">Menu</span>
                    </div>
                }
            >
                <ul className="ml-8 mt-4">
                    <li className="mb-4">
                        <SidebarLink
                            link="/menu/categories"
                            title="Categories"
                        />
                    </li>
                    <li className="mb-4">
                        <SidebarLink link="/menu/products" title="Products" />
                    </li>
                    <li className="mb-4">
                        <SidebarLink link="/menu/combos" title="Combos" />
                    </li>
                </ul>
            </Accordion>

            {/* Manage */}
            <Accordion
                expand={manageMatch}
                header={
                    <div className="flex items-center text-slate-500">
                        <AiOutlineSetting size={24} />
                        <span className="ml-2">Manage</span>
                    </div>
                }
            >
                <ul className="ml-8 mt-4">
                    <li className="mb-4">
                        <SidebarLink link="/manage/users" title="Users" />
                    </li>
                    <li className="mb-4">
                        <SidebarLink link="/manage/roles" title="Roles" />
                    </li>
                    <li className="mb-4">
                        <SidebarLink link="/manage/branches" title="Branches" />
                    </li>
                    <li className="mb-4">
                        <SidebarLink link="/manage/devices" title="Devices" />
                    </li>
                    <li>
                        <SidebarLink link="/manage/more" title="More..." />
                    </li>
                </ul>
            </Accordion>
        </div>
    );
};

export default MasterSidebar;
