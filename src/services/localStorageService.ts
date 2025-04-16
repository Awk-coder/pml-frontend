// Types for our data models
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'university' | 'agent' | 'admin';
  createdAt: string;
}

export interface Program {
  id: string;
  name: string;
  university: string;
  universityId: string;
  description: string;
  tuition: number;
  duration: number;
  degreeLevel: string;
  fieldOfStudy: string;
  applicationDeadline: string;
  startDate: string;
  requirements: string[];
  createdAt: string;
}

export interface Application {
  id: string;
  studentId: string;
  programId: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  submittedAt: string;
  documents: {
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  notes: string;
}

// Keys for localStorage
const STORAGE_KEYS = {
  USERS: 'pml_users',
  PROGRAMS: 'pml_programs',
  APPLICATIONS: 'pml_applications',
};

// Initialize localStorage with sample data if empty
export const initializeLocalStorage = () => {
  // Check if users exist
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const sampleUsers: User[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Student',
        email: 'student@example.com',
        role: 'student',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        firstName: 'University',
        lastName: 'Admin',
        email: 'university@example.com',
        role: 'university',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        firstName: 'Agent',
        lastName: 'Smith',
        email: 'agent@example.com',
        role: 'agent',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(sampleUsers));
  }

  // Check if programs exist
  if (!localStorage.getItem(STORAGE_KEYS.PROGRAMS)) {
    const samplePrograms: Program[] = [
      {
        id: '1',
        name: 'Computer Science',
        university: 'MIT University',
        universityId: '2',
        description: 'A comprehensive program covering all aspects of computer science.',
        tuition: 25000,
        duration: 4,
        degreeLevel: 'Bachelor',
        fieldOfStudy: 'Computer Science',
        applicationDeadline: '2023-12-31',
        startDate: '2024-09-01',
        requirements: ['High School Diploma', 'IELTS 6.5', 'Statement of Purpose'],
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Business Administration',
        university: 'Harvard Business School',
        universityId: '2',
        description: 'Learn business management and administration skills.',
        tuition: 30000,
        duration: 2,
        degreeLevel: 'Master',
        fieldOfStudy: 'Business',
        applicationDeadline: '2023-11-30',
        startDate: '2024-08-15',
        requirements: ['Bachelor Degree', 'GMAT 650+', 'Work Experience'],
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(samplePrograms));
  }

  // Check if applications exist
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    const sampleApplications: Application[] = [
      {
        id: '1',
        studentId: '1',
        programId: '1',
        status: 'pending',
        submittedAt: new Date().toISOString(),
        documents: [
          {
            name: 'Transcript',
            url: '#',
            uploadedAt: new Date().toISOString(),
          },
        ],
        notes: 'Waiting for review',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(sampleApplications));
  }
};

// User operations
export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...users, newUser]));
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | undefined => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) return undefined;
  
  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return updatedUser;
};

// Program operations
export const getPrograms = (): Program[] => {
  const programs = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
  return programs ? JSON.parse(programs) : [];
};

export const getProgramById = (id: string): Program | undefined => {
  const programs = getPrograms();
  return programs.find(program => program.id === id);
};

export const getProgramsByUniversity = (universityId: string): Program[] => {
  const programs = getPrograms();
  return programs.filter(program => program.universityId === universityId);
};

export const createProgram = (program: Omit<Program, 'id' | 'createdAt'>): Program => {
  const programs = getPrograms();
  const newProgram: Program = {
    ...program,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify([...programs, newProgram]));
  return newProgram;
};

export const updateProgram = (id: string, updates: Partial<Program>): Program | undefined => {
  const programs = getPrograms();
  const programIndex = programs.findIndex(program => program.id === id);
  
  if (programIndex === -1) return undefined;
  
  const updatedProgram = { ...programs[programIndex], ...updates };
  programs[programIndex] = updatedProgram;
  
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
  return updatedProgram;
};

export const deleteProgram = (id: string): boolean => {
  const programs = getPrograms();
  const filteredPrograms = programs.filter(program => program.id !== id);
  
  if (filteredPrograms.length === programs.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(filteredPrograms));
  return true;
};

// Application operations
export const getApplications = (): Application[] => {
  const applications = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return applications ? JSON.parse(applications) : [];
};

export const getApplicationById = (id: string): Application | undefined => {
  const applications = getApplications();
  return applications.find(application => application.id === id);
};

export const getApplicationsByStudent = (studentId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(application => application.studentId === studentId);
};

export const getApplicationsByProgram = (programId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(application => application.programId === programId);
};

export const createApplication = (application: Omit<Application, 'id' | 'submittedAt'>): Application => {
  const applications = getApplications();
  const newApplication: Application = {
    ...application,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([...applications, newApplication]));
  return newApplication;
};

export const updateApplication = (id: string, updates: Partial<Application>): Application | undefined => {
  const applications = getApplications();
  const applicationIndex = applications.findIndex(application => application.id === id);
  
  if (applicationIndex === -1) return undefined;
  
  const updatedApplication = { ...applications[applicationIndex], ...updates };
  applications[applicationIndex] = updatedApplication;
  
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  return updatedApplication;
};

export const deleteApplication = (id: string): boolean => {
  const applications = getApplications();
  const filteredApplications = applications.filter(application => application.id !== id);
  
  if (filteredApplications.length === applications.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(filteredApplications));
  return true;
}; 