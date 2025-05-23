import axios from "axios";

const API_BASE_URL = 'http://localhost:5000';
const ADMIN_URL = '/admin';

class apiService {

    // Helper: Get token from localStorage
    static getAuthHeaders() {
        const token = localStorage.getItem("adminToken");
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }

    // admin routes
    static async Register(formData){
        return axios.post(`${API_BASE_URL}${ADMIN_URL}/register`, formData);
    }

    static async Login(credentials){
        return axios.post(`${API_BASE_URL}${ADMIN_URL}/login`, credentials);
    }

    static async createAdmin(adminData){
        return axios.post(`${API_BASE_URL}${ADMIN_URL}/create`, adminData,this.getAuthHeaders());
    }

    static async getAdmins(){
        return axios.get(`${API_BASE_URL}${ADMIN_URL}/all`,this.getAuthHeaders());
    }

    static async updateAdmin(id,adminData){
        return axios.put(`${API_BASE_URL}${ADMIN_URL}/${id}`,adminData,this.getAuthHeaders());
    }

    static async deleteAdmin(id){
        return axios.delete(`${API_BASE_URL}${ADMIN_URL}/${id}`,this.getAuthHeaders());
    }

}

export default apiService;
