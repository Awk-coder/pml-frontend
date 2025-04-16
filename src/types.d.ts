// Define missing types to fix errors
interface User {
  _id?: string;
  email: string;
  role: "university" | "student" | "agent" | "admin";
  universityName?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any; // Allow any other properties
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  [key: string]: any;
}

// Define USE_MOCK_DATA global
declare const USE_MOCK_DATA: boolean;

// Fix PhoneInputProps
interface PhoneInputProps {
  value: string;
  onChange: any;
  className?: string;
  [key: string]: any;
}

// Fix ProgramsHeroProps
interface ProgramsHeroProps {
  onCategorySelect: any;
  activeCategory: string;
  onSearchChange?: any;
  searchValue?: string;
  [key: string]: any;
}

// Fix University type
interface University {
  id: string;
  name: string;
  location: string;
  status: string;
  programsCount: number;
  applicationsCount: number;
  [key: string]: any;
} 