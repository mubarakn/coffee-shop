import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import app from "../firebaseApp";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";

const db = getFirestore(app);
const Category = ({ show, onClose }) => {
    const nameRef = useRef(null);
    const [name, setName] = useState("");

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, []);

    const handleSave = async () => {
        const newCategoryRef = doc(collection(db, "categories"));
        await setDoc(newCategoryRef, { name });
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleCancel = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    return (
        <Modal
            title="Create Category"
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            <div>
                <label className="font-light text-slate-600 text-sm">
                    Name
                </label>
                <input
                    ref={nameRef}
                    type="text"
                    className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </Modal>
    );
};

export default Category;
