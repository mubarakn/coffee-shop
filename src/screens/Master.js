import { useLocation } from "react-router-dom";
import MasterHeader from "../components/MasterHeader";
import MasterSidebar from "../components/MasterSidebar";

const Master = ({ children }) => {
    const location = useLocation();
    return (
        <div className="w-full h-full flex flex-col bg-slate-200">
            {!["/login", "/register"].includes(location.pathname) && (
                <MasterHeader />
            )}
            <div className="flex-1 min-h-0 flex bg-slate-100">
                {!["/login", "/register"].includes(location.pathname) && (
                    <MasterSidebar />
                )}
                <div className="flex-1 flex flex-col">{children}</div>
            </div>
        </div>
    );
};

export default Master;
