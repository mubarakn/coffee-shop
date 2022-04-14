import axios from "axios";
const baseUrl = "/reasons/";

const getReasons = () => {
    return axios.get(baseUrl);
};

const getReason = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

const createReason = (type, reason) => {
    return axios.post(baseUrl, { type, reason });
};

const updateReason = (id, reason) => {
    return axios.put(`${baseUrl}/${id}`, { reason });
};

const deleteReason = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export { getReasons, getReason, createReason, updateReason, deleteReason };
