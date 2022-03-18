import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const OrderProducts = ({ onProductSelect, onGoBack, category }) => {
    const products = useSelector((state) =>
        state.products.filter((p) => p.category === category.id)
    );

    return (
        <div className="bg-slate-100">
            <div className="-ml-4 -mt-4 flex flex-wrap p-4">
                <div
                    onClick={() => typeof onGoBack === "function" && onGoBack()}
                    className="text-teal-500 transition ml-4 mt-4 bg-white p-4 shadow rounded-md flex justify-center items-center w-1/5 h-28 text-slate-600 cursor-pointer hover:shadow-lg"
                >
                    <FaArrowLeft />
                    <span className="ml-2">Categories</span>
                </div>
                {products.map((product) => (
                    <div
                        key={`product-${product.id}`}
                        className="transition ml-4 mt-4 bg-white p-4 shadow rounded-md flex justify-center items-center w-1/5 h-28 text-slate-600 cursor-pointer hover:shadow-lg"
                        onClick={() => {
                            if (typeof onProductSelect === "function") {
                                onProductSelect(product);
                            }
                        }}
                    >
                        {product.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderProducts;
