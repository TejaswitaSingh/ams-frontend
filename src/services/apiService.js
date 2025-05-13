import axios from "axios";

const API_BASE_URL = 'http://localhost:5000';
const ADMIN_URL = '/admin';

class apiService{
    //admin
    static async Register(formData){
        return axios.post(`${API_BASE_URL}${ADMIN_URL}/register`,formData);
    }

    static async Login(credentials){
        return axios.post(`${API_BASE_URL}${ADMIN_URL}/login`,credentials);
    }
}

export default apiService;