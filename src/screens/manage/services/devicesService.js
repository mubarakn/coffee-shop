import axios from "axios";
const baseUrl = "/devices/";

const getDevices = () => {
    return axios.get(baseUrl);
};

const createDevice = (type, code, name, branch) => {
    return axios.post(baseUrl, {
        type,
        code,
        name,
        branch,
    });
};

const getDevice = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

const updateDevice = (
    id,
    code,
    name,
    branch,
    menuGroup,
    receivesOnlineOrders
) => {
    return axios.put(`${baseUrl}/${id}`, {
        code,
        name,
        branch,
        menuGroup,
        receivesOnlineOrders,
    });
};

const deleteDevice = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

const getCode = (type) => {
    return axios.get(`${baseUrl}code/${type}`);
};

export {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    getCode,
};
