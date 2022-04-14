import axios from "axios";
const baseUrl = "/branches/";

const getBranches = () => {
    return axios.get(baseUrl);
};

const createBranch = (
    code,
    name,
    country,
    taxGroups,
    taxRegistrationName,
    taxNumber,
    openingTime,
    closingTime,
    phone,
    address,
    latitude,
    longitude,
    receiptHeader,
    receiptFooter
) => {
    return axios.post(baseUrl, {
        code,
        name,
        country,
        taxGroups,
        taxRegistrationName,
        taxNumber,
        openingTime,
        closingTime,
        phone,
        address,
        latitude,
        longitude,
        receiptHeader,
        receiptFooter,
    });
};

const getBranch = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

const updateBranch = (
    id,
    code,
    name,
    country,
    taxGroups,
    taxRegistrationName,
    taxNumber,
    openingTime,
    closingTime,
    phone,
    address,
    latitude,
    longitude,
    receiptHeader,
    receiptFooter
) => {
    return axios.put(`${baseUrl}/${id}`, {
        code,
        name,
        country,
        taxGroups,
        taxRegistrationName,
        taxNumber,
        openingTime,
        closingTime,
        phone,
        address,
        latitude,
        longitude,
        receiptHeader,
        receiptFooter,
    });
};

const deleteBranch = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export { getBranches, getBranch, createBranch, updateBranch, deleteBranch };
