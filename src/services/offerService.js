import api from "./api";

const createOffer = async (offerData) => {
    const response = await api.post("/offers", offerData);
    return response.data;
};

const getAllOffers = async () => {
    const response = await api.get("/offers/all");
    return response.data;
};

const getActiveOffers = async () => {
    const response = await api.get("/offers/active");
    return response.data;
};

const updateOffer = async (id, offerData) => {
    const response = await api.patch(`/offers/${id}`, offerData);
    return response.data;
};

const deleteOffer = async (id) => {
    const response = await api.delete(`/offers/${id}`);
    return response.data;
};

const validateOffer = async (code, amount) => {
    const response = await api.post("/offers/validate", { code, amount });
    return response.data;
};

export {
    createOffer,
    getAllOffers,
    getActiveOffers,
    updateOffer,
    deleteOffer,
    validateOffer
};
