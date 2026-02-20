import api from "../../services/api";

export const getAddressesAPI = async () => {
    const res = await api.get("/users/current-user");
    return res.data.data.addresses;
};

export const addAddressAPI = async (data) => {
    const res = await api.post("/users/addresses", data);
    return res.data.data;
};

export const updateAddressAPI = async (id, data) => {
    const res = await api.put(`/users/address/${id}`, data);
    return res.data.data;
};

export const setDefaultAddressAPI = async (id) => {
    const res = await api.patch(`/users/addresses/${id}/default`);
    return res.data.data;
};