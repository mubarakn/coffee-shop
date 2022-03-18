import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderNumber = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-4 rounded shadow">
            <button
                className="flex items-center text-gray-600 hover:text-gray-800 transition"
                onClick={() => navigate("/")}
            >
                <FaArrowLeft /> <span className="ml-2">Back</span>
            </button>

            <span className="mt-4 block text-sm text-gray-600">Order No.</span>
            <h1 className="text-3xl font-light text-gray-800">New Order</h1>
        </div>
    );
};

export default OrderNumber;
