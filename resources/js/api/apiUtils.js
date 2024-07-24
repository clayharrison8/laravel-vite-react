import axios from 'axios';

const apiRequest = async (method, url, data = null) => {
    try {
        const response = await axios({ method, url, data });
        return response.data;
    } catch (error) {
        console.error(`Error with ${method} request:`, error);
        throw error;
    }
};

export default apiRequest;
