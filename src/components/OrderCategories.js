import { useSelector } from "react-redux";

const OrderCategories = ({ onCategorySelect }) => {
    const categories = useSelector((state) => state.categories);

    return (
        <div className="bg-slate-100">
            <div className="-ml-4 -mt-4 flex flex-wrap p-4">
                {categories.map((category) => (
                    <div
                        key={`category-${category.id}`}
                        className="transition ml-4 mt-4 bg-white p-4 shadow rounded-md flex justify-center items-center w-1/5 h-28 text-slate-600 cursor-pointer hover:shadow-lg"
                        onClick={() => {
                            if (typeof onCategorySelect === "function") {
                                onCategorySelect(category);
                            }
                        }}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderCategories;
