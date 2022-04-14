import axios from "axios";
const baseUrl = "/users/";

const getUsers = () => {
    return axios.get(baseUrl);
};

const createUser = (name, language, email, password, loginPin) => {
    return axios.post(baseUrl, {
        name,
        language,
        email,
        password,
        loginPin,
    });
};

const getUser = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

const updateUser = (id, name, language, email, loginPin) => {
    return axios.put(`${baseUrl}/${id}`, {
        name,
        language,
        email,
        loginPin,
    });
};

const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

const assignRoles = (id, roles) => {
    return axios.put(`${baseUrl}/${id}/roles`, { roles });
};

const assignBranches = (id, branches) => {
    return axios.put(`${baseUrl}/${id}/branches`, { branches });
};

const assignTags = (id, tags) => {
    return axios.put(`${baseUrl}/${id}/tags`, { tags });
};

const changePassword = (id, password) => {
    return axios.put(`${baseUrl}/${id}/changePassword`, { password });
};

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    assignRoles,
    assignBranches,
    assignTags,
    changePassword,
};
