import api from "../services/api";

export async function fetchSizes() {
    try {
        const response = await api.get('/sizes');
        return response.data;
    } catch (error) {
        console.error("Error fetching sizes:", error);
        return { data: [] };
    }
}

export async function fetchColors() {
    try {
        const response = await api.get('/colors');
        return response.data;
    } catch (error) {
        console.error("Error fetching colors:", error);
        return { data: [] };
    }
}
