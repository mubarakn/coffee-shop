import { useState } from "react";
import OrderCategories from "../components/OrderCategories";
import OrderSidebar from "../components/OrderSidebar";
import OrderProducts from "../components/OrderProducts";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";

const Order = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState(null);

    const handleCategorySelect = (category) => {
        console.log(category);
        setCategory(category);
    };

    const handleProduct = (product) => {
        dispatch(
            addProduct({
                item: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
            })
        );
    };

    return (
        <div className="flex bg-slate-100 h-full">
            <div className="w-1/4">
                <OrderSidebar />
            </div>
            <div className="w-3/4 min-h-0 overflow-scroll">
                {!category && (
                    <OrderCategories onCategorySelect={handleCategorySelect} />
                )}
                {category && (
                    <OrderProducts
                        category={category}
                        onGoBack={() => setCategory(null)}
                        onProductSelect={handleProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default Order;
