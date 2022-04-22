const CategoryList = ({ categories, handleCategoryClick }) => {
    return (
        <div className="flex rounded justify-center">
            <div className="bg-white w-10/12 mt-10 p-4 rounded shadow">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="w-10">
                                <input type="checkbox" />
                            </th>
                            <th className="text-left">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => {
                            return (
                                <tr
                                    key={`category-${category.id}`}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                    className="cursor-pointer hover:bg-slate-100"
                                >
                                    <td className="w-10 text-center">
                                        <input type="checkbox" />
                                    </td>
                                    <td>{category.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
