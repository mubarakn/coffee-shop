import Master from "./Master";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import Category from "./MenuCategoryModal";
import Button from "../components/Button";
import Page from "./Page";
import { getCategories } from "./menuCategoryService";

//Category Structure
// { id: i, name: `Category ${i}` }

const Categories = () => {
    const [id, setId] = useState("");
    const [showModal, toggleModal] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((response) => {
            setCategories(response.data.categories);
        });
    }, []);

    const handleSave = (category) => {
        if (id) {
            setCategories(
                categories.map((cat) => {
                    if (cat.id === category.id) {
                        return category;
                    }
                    return cat;
                })
            );
        } else {
            setCategories([...categories, category]);
        }
        toggleModal(false);
    };

    const handleCategoryClick = (category) => {
        setId(category.id);
        toggleModal(true);
    };

    const handleDelete = (id) => {
        setCategories(categories.filter((c) => c.id !== id));
        toggleModal(false);
    };

    return (
        <Page
            title="Categories"
            actions={
                <Button
                    title="Create Category"
                    onClick={() => toggleModal(true)}
                    primary
                />
            }
        >
            <CategoryList
                categories={categories}
                handleCategoryClick={handleCategoryClick}
            />
            <Category
                id={id}
                show={showModal}
                onSave={handleSave}
                onClose={() => toggleModal(false)}
                onDelete={handleDelete}
            />
        </Page>
    );
};

export default Categories;
