import axios from "axios";
const baseUrl = "/paymentMethods/";

const getPaymentMethods = () => {
    return axios.get(baseUrl);
};

const createPaymentMethod = (name, type, autoOpenCashDrawer, active) => {
    return axios.post(baseUrl, { name, type, autoOpenCashDrawer, active });
};

const updatePaymentMethod = (id, name, type, autoOpenCashDrawer, active) => {
    return axios.put(`${baseUrl}/${id}`, {
        name,
        type,
        autoOpenCashDrawer,
        active,
    });
};

const deletePaymentMethod = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export {
    getPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
};
