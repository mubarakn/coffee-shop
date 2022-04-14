import axios from "axios";
const baseUrl = "/roles/";

const getRoles = () => {
    return axios.get(baseUrl);
};

const getRole = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

const createRole = (role) => {
    return axios.post(baseUrl, role);
};

const updateRole = (role) => {
    return axios.put(`${baseUrl}/${role.id}`, role);
};

const deleteRole = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export { getRoles, getRole, createRole, updateRole, deleteRole };
