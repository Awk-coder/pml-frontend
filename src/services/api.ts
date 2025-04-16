import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { API_URL } from "../config/api";

const USE_MOCK_DATA = true; // Force use of mock data while backend is in development

const mockData = {
  // Admin data
  adminStats: () => ({
    totalStudents: 156,
    totalAgents: 45,
    totalUniversities: 12,
    totalApplications: 89,
    recentApplications: Array(5)
      .fill(null)
      .map((_, i) => ({
        _id: `app-${i}`,
        student: {
          name: `Student ${i + 1}`,
          email: `student${i + 1}@example.com`,
        },
        program: {
          name: `Program ${i + 1}`,
        },
        status: ["pending", "reviewing", "approved", "rejected"][
          Math.floor(Math.random() * 4)
        ],
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
  }),

  // University data
  universityPrograms: () =>
    Array(8)
      .fill(null)
      .map((_, i) => ({
        id: `prog-${i}`,
        title: `Program ${i + 1}`,
        description: `This is a description for program ${i + 1}`,
        level: ["Bachelor", "Master", "PhD"][Math.floor(Math.random() * 3)],
        duration: `${Math.floor(Math.random() * 4) + 1} years`,
        tuitionFee: Math.floor(Math.random() * 30000) + 5000,
        featured: Math.random() > 0.7,
      })),

  universityApplications: () =>
    Array(10)
      .fill(null)
      .map((_, i) => ({
        id: `uapp-${i}`,
        student: {
          name: `Student ${i + 1}`,
          email: `student${i + 1}@example.com`,
          phone: `+123456789${i}`,
        },
        program: {
          title: `Program ${Math.floor(Math.random() * 5) + 1}`,
          level: ["Bachelor", "Master", "PhD"][Math.floor(Math.random() * 3)],
        },
        status: ["pending", "reviewing", "approved", "rejected"][
          Math.floor(Math.random() * 4)
        ],
        submittedDate: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        documents: [
          { name: "Transcript", status: "verified" },
          { name: "CV", status: "pending" },
        ],
      })),

  // Student data
  studentApplications: () =>
    Array(3)
      .fill(null)
      .map((_, i) => ({
        id: `sapp-${i}`,
        program: {
          title: `Bachelor of ${
            ["Computer Science", "Engineering", "Business"][i % 3]
          }`,
          university: `University ${i + 1}`,
        },
        status: ["pending", "under review", "accepted", "rejected"][
          Math.floor(Math.random() * 4)
        ],
        submittedDate: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),

  // Agent data
  agentStudents: () =>
    Array(5)
      .fill(null)
      .map((_, i) => ({
        id: `student-${i}`,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@example.com`,
        applications: Math.floor(Math.random() * 3),
        status: Math.random() > 0.7 ? "inactive" : "active",
      })),

  agentCommissions: () => ({
    total: 12450,
    pending: 3200,
    thisMonth: 1800,
    history: Array(6)
      .fill(null)
      .map((_, i) => ({
        id: `comm-${i}`,
        student: `Student ${i + 1}`,
        university: `University ${(i % 3) + 1}`,
        amount: Math.floor(Math.random() * 2000) + 500,
        status: Math.random() > 0.3 ? "paid" : "pending",
        date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
      })),
  }),

  // Mock programs data
  programs: () => {
    return Array(15).fill(null).map((_, i) => ({
      id: `prog-${i}`,
      title: `${["Bachelor", "Master", "PhD"][Math.floor(Math.random() * 3)]} of ${
        ["Computer Science", "Business Administration", "Engineering", "Medicine", "Arts", "Law"][
          Math.floor(Math.random() * 6)
        ]
      }`,
      university: [
        "Tech University",
        "Global Business School",
        "Medical Institute",
        "Arts Academy",
        "Engineering College",
        "Law School"
      ][Math.floor(Math.random() * 6)],
      level: ["Bachelor's", "Master's", "PhD"][Math.floor(Math.random() * 3)],
      duration: `${Math.floor(Math.random() * 3) + 1} years`,
      description: "This program provides students with comprehensive knowledge and skills in the field. Students will learn theoretical concepts and practical applications through a combination of lectures, workshops, and hands-on projects.",
      field: ["Computer Science", "Business", "Engineering", "Medicine", "Arts", "Law"][
        Math.floor(Math.random() * 6)
      ],
      tuitionFee: Math.floor(Math.random() * 30000) + 5000,
    }));
  },
};

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

class Api {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          console.error("API Error:", error.response.data);

          if (error.response.status === 401) {
            this.clearAuthToken();
          }
          throw new ApiError(
            error.response.data.message || "An error occurred",
            error.response.status,
            error.response.data.code
          );
        } else if (error.request) {
          console.error("API Error: No response received", error.request);
        } else {
          console.error("API Error:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string): void {
    this.token = token;
    localStorage.setItem("token", token);
  }

  clearAuthToken(): void {
    this.token = null;
    localStorage.removeItem("token");
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  // Auth endpoints
  async login(email: string, password: string) {
    try {
      const response = await this.post<ApiResponse<{ token: string; user: User }>>('/auth/login', { email, password });
      return response.data.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async googleLogin(token: string) {
    try {
      const response = await this.post<ApiResponse<{ token: string; user: User }>>('/auth/google', { token });
      return response.data.data;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  }

  async register(userData: any) {
    try {
      const response = await this.post<ApiResponse<{ token: string; user: User }>>('/auth/register', userData);
      return response.data.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.get<ApiResponse<User>>('/auth/me');
      return response.data.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Programs endpoints
  async getPrograms(filters = {}) {
    if (USE_MOCK_DATA) {
      // Return mock programs data
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockData.programs();
    }
    
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    const response = await fetch(`/api/programs?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  }

  async getProgram(id: string) {
    const { data } = await this.get(`/programs/${id}`);
    return data;
  }

  async getCategories() {
    const { data } = await this.get("/programs/categories");
    return data;
  }

  async getLevels() {
    const { data } = await this.get("/programs/levels");
    return data;
  }

  async getCampuses() {
    const { data } = await this.get("/programs/campuses");
    return data;
  }

  // University endpoints
  async getUniversityApplications(filters: { status?: string } = {}) {
    if (USE_MOCK_DATA) {
      let apps = mockData.universityApplications();
      if (filters.status && filters.status !== "all") {
        apps = apps.filter((app) => app.status === filters.status);
      }
      return apps;
    }
    const { data } = await this.get("/universities/applications", {
      params: filters,
    });
    return data;
  }

  async updateApplicationStatus(id: string, status: string) {
    const { data } = await this.patch(`/university/applications/${id}/status`, {
      status,
    });
    return data;
  }

  // Student applications
  async submitApplication(programId, formData) {
    if (USE_MOCK_DATA) {
      // Mock successful application submission
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        id: `app-${Math.random().toString(36).substring(2, 9)}`,
        programId,
        status: "pending",
        submittedDate: new Date().toISOString()
      };
    }
    
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        programId,
        ...formData
      }),
    });
    
    if (!response.ok) throw new Error('Failed to submit application');
    return response.json();
  }

  async getMyApplications() {
    const { data } = await this.get("/student/applications");
    return data;
  }

  // Agent endpoints
  async getAgentDashboard() {
    const { data } = await this.get("/agent/dashboard");
    return data;
  }

  async getAgentApplications(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const { data } = await this.get("/agent/applications", { params });
    return data;
  }

  async createApplication(applicationData: any) {
    const { data } = await this.post("/agent/applications", applicationData);
    return data;
  }

  async createAgent(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    territory: {
      country: string;
      state?: string;
      city: string;
    };
    commissionRate: number;
  }) {
    const { data: response } = await this.post("/admin/agents", data);
    return response;
  }

  // Admin methods
  getAdminStats = async () => {
    if (USE_MOCK_DATA) {
      return mockData.adminStats();
    }
    const response = await this.get("/admin/stats");
    return response.data;
  };

  // University methods
  getUniversityPrograms = async () => {
    if (USE_MOCK_DATA) {
      return mockData.universityPrograms();
    }
    const response = await this.get("/universities/programs");
    return response.data;
  };

  // Agent methods
  getAgentStudents = async () => {
    if (USE_MOCK_DATA) {
      return mockData.agentStudents();
    }
    const response = await this.get("/agents/students");
    return response.data;
  };

  getAgentCommissions = async () => {
    if (USE_MOCK_DATA) {
      return mockData.agentCommissions();
    }
    const response = await this.get("/agents/commissions");
    return response.data;
  };

  // Student methods
  async getStudentApplications() {
    if (USE_MOCK_DATA) {
      return mockData.studentApplications();
    }
    
    // Use the existing implementation but with the fetch API style
    const response = await fetch('/api/student/applications');
    if (!response.ok) throw new Error('Failed to fetch applications');
    return response.json();
  }

  // Admin impersonation methods
  adminViewAsUniversity = async (universityId: string) => {
    const response = await this.get(
      `/admin/view-as/university/${universityId}`
    );
    return response.data;
  };

  adminViewAsAgent = async (agentId: string) => {
    const response = await this.get(`/admin/view-as/agent/${agentId}`);
    return response.data;
  };

  adminViewAsStudent = async (studentId: string) => {
    const response = await this.get(`/admin/view-as/student/${studentId}`);
    return response.data;
  };

  // Get program by ID
  async getProgramById(programId) {
    const response = await fetch(`/api/programs/${programId}`);
    if (!response.ok) throw new Error('Failed to fetch program details');
    return response.json();
  }

  // Get application by ID
  async getApplicationById(applicationId) {
    if (USE_MOCK_DATA) {
      // Create a mock application with detailed information
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        id: applicationId,
        program: {
          id: "prog-123",
          title: "Master of Computer Science",
          university: "Tech University",
          level: "Master's",
          duration: "2 years",
          startDate: "September 2023"
        },
        status: ["pending", "under review", "accepted", "rejected"][Math.floor(Math.random() * 4)],
        submittedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        timeline: [
          {
            step: "Application Submitted",
            date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed"
          },
          {
            step: "Document Verification",
            date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed",
            notes: "All documents have been verified."
          },
          {
            step: "Application Review",
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            status: "current",
            notes: "Your application is currently being reviewed by the admissions committee."
          },
          {
            step: "Interview",
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: "upcoming"
          },
          {
            step: "Final Decision",
            date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: "upcoming"
          }
        ],
        documents: [
          { name: "Academic Transcript", status: "verified" },
          { name: "CV/Resume", status: "verified" },
          { name: "Statement of Purpose", status: "pending" },
          { name: "Recommendation Letter", status: "pending" }
        ],
        messages: [
          {
            sender: "university",
            text: "Thank you for your application. We are currently reviewing your documents.",
            date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            sender: "student",
            text: "Thank you for the update. When can I expect to hear back about the interview?",
            date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            sender: "university",
            text: "We will schedule interviews within the next 2 weeks. You will receive an email with the details.",
            date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
      };
    }
    
    const response = await fetch(`/api/applications/${applicationId}`);
    if (!response.ok) throw new Error('Failed to fetch application details');
    return response.json();
  }

  // Get list of universities
  async getUniversities() {
    if (USE_MOCK_DATA) {
      // Return a mock list of universities
      await new Promise(resolve => setTimeout(resolve, 300));
      return [
        "Tech University",
        "Global Business School",
        "Medical Institute",
        "Arts Academy",
        "Engineering College",
        "Law School"
      ];
    }
    
    const response = await fetch('/api/universities');
    if (!response.ok) throw new Error('Failed to fetch universities');
    return response.json();
  }
}

export const api = new Api();

// Add methods to the api object
api.login = async (email: string, password: string) => {
  try {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/login', { email, password });
    return response.data.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

api.googleLogin = async (token: string) => {
  try {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/google', { token });
    return response.data.data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

api.register = async (userData: any) => {
  try {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>('/auth/register', userData);
    return response.data.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

api.getCurrentUser = async () => {
  try {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};
