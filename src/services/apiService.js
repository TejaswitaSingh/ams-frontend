import axios from "axios";

const API_BASE_URL = 'http://localhost:5000';
const ADMIN_URL = '/admin';
const TEACHER_URL = '/teacher';
const STUDENT_URL = '/student';

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

  // ====================== ADMIN ROUTES ======================
  static async Register(formData) {
    return axios.post(`${API_BASE_URL}${ADMIN_URL}/register`, formData);
  }

  static async Login(credentials) {
    return axios.post(`${API_BASE_URL}${ADMIN_URL}/login`, credentials);
  }

  static async createAdmin(adminData) {
    return axios.post(`${API_BASE_URL}${ADMIN_URL}/create`, adminData, this.getAuthHeaders());
  }

  static async getAdmins(page = 1, pageSize = 5, searchParams = {}) {
    const params = { page, limit: pageSize, ...searchParams };
    return axios.get(`${API_BASE_URL}${ADMIN_URL}/all`, {
      ...this.getAuthHeaders(),
      params
    });
  }

  static async updateAdmin(id, adminData) {
    return axios.put(`${API_BASE_URL}${ADMIN_URL}/${id}`, adminData, this.getAuthHeaders());
  }

  static async deleteAdmin(id) {
    return axios.delete(`${API_BASE_URL}${ADMIN_URL}/${id}`, this.getAuthHeaders());
  }

  // ====================== TEACHER ROUTES ======================
  static async createTeacher(data) {
    return axios.post(`${API_BASE_URL}${TEACHER_URL}/create`, data, this.getAuthHeaders());
  }

  static async getTeachers(page = 1, limit = 10, filters = {}) {
    return axios.get(`${API_BASE_URL}${TEACHER_URL}/all`, {
      ...this.getAuthHeaders(),
      params: { page, limit, ...filters }
    });
  }

  static async updateTeacher(id, data) {
    return axios.put(`${API_BASE_URL}${TEACHER_URL}/${id}`, data, this.getAuthHeaders());
  }

  static async deleteTeacher(id) {
    return axios.delete(`${API_BASE_URL}${TEACHER_URL}/${id}`, this.getAuthHeaders());
  }

  // ====================== STUDENT ROUTES ======================
  static async createStudent(data) {
    return axios.post(`${API_BASE_URL}${STUDENT_URL}`, data, this.getAuthHeaders());
  }

  static async getStudents(page = 1, limit = 10, filters = {}) {
    const params = { page, limit, ...filters };
    return axios.get(`${API_BASE_URL}${STUDENT_URL}`, {
      ...this.getAuthHeaders(),
      params
    });
  }

  static async getStudentById(id) {
    return axios.get(`${API_BASE_URL}${STUDENT_URL}/${id}`, this.getAuthHeaders());
  }

  static async updateStudent(id, data) {
    return axios.put(`${API_BASE_URL}${STUDENT_URL}/${id}`, data, this.getAuthHeaders());
  }

  static async deleteStudent(id) {
    return axios.delete(`${API_BASE_URL}${STUDENT_URL}/${id}`, this.getAuthHeaders());
  }
}

export default apiService;
