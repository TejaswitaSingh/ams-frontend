import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
const ADMIN_URL = "/admin";
const TEACHER_URL = "/teacher";
const STUDENT_URL = "/student";
const CLASS_URL = "/class";
const SECTION_URL = "/section";

class apiService {
  static getAuthHeaders() {
    const token = localStorage.getItem("adminToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  // ====================== ADMIN ROUTES ======================
  static Register(data) {
    return axios.post(`${API_BASE_URL}${ADMIN_URL}/register`, data);
  }

  static Login(credentials) {
    return axios.post(`${API_BASE_URL}${ADMIN_URL}/login`, credentials);
  }

  static createAdmin(data) {
    return axios.post(`${API_BASE_URL}${ADMIN_URL}/create`, data, this.getAuthHeaders());
  }

  static getAdmins(page = 1, limit = 10, filters = {}) {
    return axios.get(`${API_BASE_URL}${ADMIN_URL}/all`, {
      ...this.getAuthHeaders(),
      params: { page, limit, ...filters },
    });
  }

  static updateAdmin(id, data) {
    return axios.put(`${API_BASE_URL}${ADMIN_URL}/${id}`, data, this.getAuthHeaders());
  }

  static deleteAdmin(id) {
    return axios.delete(`${API_BASE_URL}${ADMIN_URL}/${id}`, this.getAuthHeaders());
  }

  // ====================== TEACHER ROUTES ======================
  static createTeacher(data) {
    return axios.post(`${API_BASE_URL}${TEACHER_URL}/create`, data, this.getAuthHeaders());
  }

  static getTeachers(page = 1, limit = 10, filters = {}) {
    return axios.get(`${API_BASE_URL}${TEACHER_URL}/all`, {
      ...this.getAuthHeaders(),
      params: { page, limit, ...filters },
    });
  }

  static updateTeacher(id, data) {
    return axios.put(`${API_BASE_URL}${TEACHER_URL}/${id}`, data, this.getAuthHeaders());
  }

  static deleteTeacher(id) {
    return axios.delete(`${API_BASE_URL}${TEACHER_URL}/${id}`, this.getAuthHeaders());
  }

  // ====================== STUDENT ROUTES ======================
  static createStudent(data) {
    return axios.post(`${API_BASE_URL}${STUDENT_URL}`, data, this.getAuthHeaders());
  }

  static getStudents(page = 1, limit = 10, filters = {}) {
    return axios.get(`${API_BASE_URL}${STUDENT_URL}`, {
      ...this.getAuthHeaders(),
      params: { page, limit, ...filters },
    });
  }

  static getStudentById(id) {
    return axios.get(`${API_BASE_URL}${STUDENT_URL}/${id}`, this.getAuthHeaders());
  }

  static updateStudent(id, data) {
    return axios.put(`${API_BASE_URL}${STUDENT_URL}/${id}`, data, this.getAuthHeaders());
  }

  static deleteStudent(id) {
    return axios.delete(`${API_BASE_URL}${STUDENT_URL}/${id}`, this.getAuthHeaders());
  }

  // ====================== CLASS ROUTES ======================
  static createClass(data) {
    return axios.post(`${API_BASE_URL}${CLASS_URL}/create`, data, this.getAuthHeaders());
  }

  static getClasses(page = 1, limit = 10, filters = {}) {
    return axios.get(`${API_BASE_URL}${CLASS_URL}`, {
      ...this.getAuthHeaders(),
      params: { page, limit, ...filters },
    });
  }

  static getClassById(id) {
    return axios.get(`${API_BASE_URL}${CLASS_URL}/${id}`, this.getAuthHeaders());
  }

  static updateClass(id, data) {
    return axios.put(`${API_BASE_URL}${CLASS_URL}/${id}`, data, this.getAuthHeaders());
  }

  static deleteClass(id) {
    return axios.delete(`${API_BASE_URL}${CLASS_URL}/${id}`, this.getAuthHeaders());
  }

  // ====================== SECTION ROUTES ======================
  static createSection(data) {
    return axios.post(`${API_BASE_URL}${SECTION_URL}/create`, data, this.getAuthHeaders());
  }

  static getSections(classId, page = 1, limit = 10) {
    return axios.get(`${API_BASE_URL}${SECTION_URL}/${classId}`, {
      ...this.getAuthHeaders(),
      params: { page, limit },
    });
  }

  static updateSection(id, data) {
    return axios.put(`${API_BASE_URL}${SECTION_URL}/${id}`, data, this.getAuthHeaders());
  }

  static deleteSection(id) {
    return axios.delete(`${API_BASE_URL}${SECTION_URL}/${id}`, this.getAuthHeaders());
  }
}

export default apiService;
