import axios from "axios";
const baseUrl = "/settings";

export const getSettings = () => {
    return axios.get(baseUrl);
};

export const updateGeneralSettings = (data) => {
    return axios.put(`${baseUrl}/general`, data);
};

export const updateLoyaltySettings = (data) => {
    return axios.put(`${baseUrl}/loyalty`, data);
};

export const updateReceiptSettings = (data) => {
    return axios.put(`${baseUrl}/receipt`, data);
};

export const updateCashierSettings = (data) => {
    return axios.put(`${baseUrl}/cashier`);
};
