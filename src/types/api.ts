export interface Program {
  _id: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  duration: string;
  level: string;
  accreditation: string;
  career: string;
  tuitionFee: number;
  intakes: string[];
  campuses: string[];
  featured: boolean;
  university: {
    name: string;
    logo: string;
    location: string;
  };
  requirements: {
    academic: string[];
    english: string[];
    other: string[];
  };
  curriculum: {
    year: string;
    description: string;
    subjects: string[];
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
  };
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
}

export interface Application {
  _id: string;
  student: {
    name: string;
    email: string;
  };
  program: {
    name: string;
  };
  status: string;
  createdAt: string;
}

export interface AdminDashboardStats {
  totalStudents: number;
  totalAgents: number;
  totalUniversities: number;
  totalApplications: number;
  recentApplications: Application[];
}

export interface DashboardCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  link: string;
}
