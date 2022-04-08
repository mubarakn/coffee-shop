import { useLocation } from "react-router-dom";
import MasterHeader from "../components/MasterHeader";
import MasterSidebar from "../components/MasterSidebar";

const Master = ({ children }) => {
    const location = useLocation();
    return (
        <div className="w-full h-full flex flex-col bg-slate-200">
            {location.pathname !== "/login" && <MasterHeader />}
            <div className="flex-1 flex bg-slate-200">
                {location.pathname !== "/login" && <MasterSidebar />}
                <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default Master;
