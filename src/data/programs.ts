// Export the programs data as an array
export const programs = [
  {
    id: "nursing-diploma-ucmi",
    title: "Diploma in Nursing",
    category: "Healthcare",
    description:
      "Comprehensive nursing program preparing students for careers in healthcare",
    overview:
      "This program provides essential knowledge and skills for nursing practice",
    duration: "3 years",
    level: "Diploma",
    accreditation: "Malaysian Nursing Board (LJM, DAN)",
    career: "Registered Nurse, Healthcare Provider",
    tuitionFee: 25000,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "Malaysian Certificate of Education (SPM) with five (5) CREDIT or equivalent",
        "CREDIT in Malay language",
        "CREDIT in Mathematics/Additional Mathematics",
        "CREDIT in one (1) of the subjects: Science/Biology/Chemistry/Physics/Applied Science",
        "Two (2) CREDITS for other subjects",
        "PASS in English",
      ],
      english: [
        "SPM English PASS",
        "For international students: IELTS 5.5 or TOEFL PBT 515 or TOEFL iBT 80",
      ],
      other: [
        "For LJM registered nurses: Malaysian Nursing Certificate/Community Nursing Certificate",
        "Registered with the Malaysian Nursing Board (LJM)",
        "Possess Annual Practice Certificate (APC) from LJM, DAN",
        "Have at least three (3) years of clinical work experience",
      ],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in nursing principles and basic healthcare",
        subjects: [
          "Anatomy & Physiology",
          "Basic Nursing Skills",
          "Healthcare Ethics",
          "Communication in Healthcare",
        ],
      },
      {
        year: "Year 2",
        description: "Advanced nursing care and specialized knowledge",
        subjects: [
          "Medical-Surgical Nursing",
          "Pharmacology",
          "Pediatric Nursing",
          "Clinical Practice I",
        ],
      },
      {
        year: "Year 3",
        description: "Professional practice and clinical specialization",
        subjects: [
          "Community Health Nursing",
          "Mental Health Nursing",
          "Nursing Leadership",
          "Clinical Practice II",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Vol.3(24) (12/24)",
    courseCode: "R2/723/4/0109 MQ A/FA 9592",
  },
  {
    id: "pharmacy-diploma-ucmi",
    title: "Diploma in Pharmacy",
    category: "Healthcare",
    description:
      "Comprehensive pharmacy program preparing students for careers in pharmaceutical sciences",
    overview:
      "This program provides essential knowledge and skills for pharmacy practice",
    duration: "3 years",
    level: "Diploma",
    accreditation: "Malaysian Pharmacy Board",
    career: "Pharmacy Assistant, Pharmaceutical Technician",
    tuitionFee: 28000,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "For Science stream students: Malaysian Certificate of Education (SPM) or equivalent with CREDIT in three (3) subjects and passed at least two (2) Science subjects (Biology/Physics/Chemistry/General Science/Applied Science/Health Science)",
        "For Non-Science Stream Students: Malaysian Certificate of Education (SPM) or equivalent with CREDIT in three (3) subjects with at least one (1) Science subject (Biology/Physics/Chemistry/General Science/Applied Science/Health Science)",
      ],
      english: ["PASS in English"],
      other: [],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in pharmaceutical sciences",
        subjects: [
          "Pharmaceutical Chemistry",
          "Human Anatomy & Physiology",
          "Pharmacy Practice",
          "Pharmaceutical Calculations",
        ],
      },
      {
        year: "Year 2",
        description: "Intermediate pharmaceutical knowledge",
        subjects: [
          "Pharmacology",
          "Pharmaceutical Microbiology",
          "Pharmaceutical Technology",
          "Medicinal Chemistry",
        ],
      },
      {
        year: "Year 3",
        description: "Advanced pharmacy practice",
        subjects: [
          "Clinical Pharmacy",
          "Pharmacotherapeutics",
          "Pharmacy Management",
          "Professional Practice",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Jld.4(10) (07/26)",
    courseCode: "R2/727/4/0012 MQA/FA 0328",
  },
  {
    id: "medical-science-diploma-ucmi",
    title: "Diploma in Medical Science",
    category: "Healthcare",
    description:
      "Comprehensive medical science program preparing students for careers in healthcare and laboratory sciences",
    overview:
      "This program provides essential knowledge and skills for medical laboratory practice",
    duration: "3 years",
    level: "Diploma",
    accreditation: "Malaysian Medical Council",
    career: "Medical Laboratory Technologist, Research Assistant",
    tuitionFee: 30000,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "PASS Sijil Pelajaran Malaysia (SPM) or equivalent by obtaining at least three (3) CREDITS in the following subjects:",
        "One (1) in a Science subject (Science/Biology/Physics/Chemistry/Applied Science/Additional Science/Science Knowledge/Sports)",
        "Two (2) other subjects",
        "PASS Malay Language",
        "OR",
        "PASS GCE O-Level or its equivalent with at least three (3) CREDITS in Science subjects (Biology/Physics/Chemistry/Combined Sciences)",
        "Two (2) other subjects",
        "PASS English",
        "OR",
        "PASS Certificate in related field with a minimum CGPA of at least 2.75",
        "OR",
        "Other qualifications recognized as equivalent by Malaysian government",
      ],
      english: ["PASS in English"],
      other: [
        "Students who are recruited must be certified as having a good health status by a registered medical officer",
      ],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in medical sciences",
        subjects: [
          "Human Anatomy & Physiology",
          "Basic Biochemistry",
          "Medical Terminology",
          "Laboratory Safety",
        ],
      },
      {
        year: "Year 2",
        description: "Intermediate medical laboratory techniques",
        subjects: [
          "Clinical Biochemistry",
          "Hematology",
          "Medical Microbiology",
          "Immunology",
        ],
      },
      {
        year: "Year 3",
        description: "Advanced laboratory practice",
        subjects: [
          "Clinical Pathology",
          "Molecular Diagnostics",
          "Research Methodology",
          "Professional Practice",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Jld.4(15) (08/26)",
    courseCode: "R2/721/4/0040 MQA/PA/8031",
  },
  {
    id: "medical-assistant-diploma-ucmi",
    title: "Diploma in Medical Science and Health",
    category: "Healthcare",
    description:
      "Comprehensive medical assistant program preparing students for careers in healthcare support",
    overview:
      "Previously known as Medical Assistant Diploma, this program provides essential knowledge and skills for medical assistance practice",
    duration: "3 years",
    level: "Diploma",
    accreditation: "Malaysian Medical Assistant Board",
    career: "Medical Assistant, Healthcare Support Specialist",
    tuitionFee: 27000,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "PASS Sijil Pelajaran Malaysia (SPM) or equivalent with at least CREDIT in five (5) subjects including:",
        "Bahasa Malaysia",
        "Mathematics/Additional Mathematics",
        "One (1) Science subject (Biology/Physics/Chemistry/General Science/Applied Science)",
        "Two (2) other subjects",
        "PASS in English",
      ],
      english: ["PASS in English"],
      other: [
        "Candidates must be certified as having a good health status by a registered medical officer",
        "Height: At least 157 cm for males and 152 cm for females",
        "Weight: At least 48 kg for males and 46 kg for females",
        "No physical disabilities or chronic diseases that may interfere with clinical practice",
        "No color blindness",
      ],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in medical assistance",
        subjects: [
          "Anatomy & Physiology",
          "Basic Medical Sciences",
          "First Aid & Emergency Care",
          "Medical Ethics",
        ],
      },
      {
        year: "Year 2",
        description: "Clinical skills development",
        subjects: [
          "Clinical Medicine",
          "Pharmacology",
          "Diagnostic Procedures",
          "Community Health",
        ],
      },
      {
        year: "Year 3",
        description: "Advanced clinical practice",
        subjects: [
          "Emergency Medicine",
          "Maternal & Child Health",
          "Medical-Surgical Procedures",
          "Clinical Practicum",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Jld.4(20) (09/26)",
    courseCode: "R2/721/4/0041 MQA/FA 0329",
  },
  {
    id: "hr-management-diploma-ucmi",
    title: "Diploma in Human Resource Management",
    category: "Business",
    description:
      "Comprehensive HR management program preparing students for careers in personnel administration and development",
    overview:
      "This program provides essential knowledge and skills for human resource management in various organizations",
    duration: "2 years 6 months",
    level: "Diploma",
    accreditation: "Malaysian Qualifications Agency",
    career: "HR Assistant, Recruitment Coordinator, Training Administrator",
    tuitionFee: 22000,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "PASS Sijil Pelajaran Malaysia (SPM) or equivalent with at least CREDIT in three (3) subjects",
        "OR",
        "PASS the Malaysian Higher School Certificate (STPM) with a minimum grade of C (NGMP 2.0) in any subject",
        "OR",
        "PASS the Malaysian Higher Certificate of Religion (STAM) with a minimum grade of Maqbul",
        "OR",
        "PASS Certificate (Level 3 of the Malaysian Qualifications Framework, KKM) in a related field with a minimum CGPA of 2.00",
        "OR",
        "PASS Level 3 of the Malaysian Skills Certificate (SKM) in a related field",
      ],
      english: ["PASS in English"],
      other: [],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in HR management",
        subjects: [
          "Principles of Management",
          "Introduction to HR",
          "Business Communication",
          "Employment Law",
        ],
      },
      {
        year: "Year 2",
        description: "Intermediate HR practices",
        subjects: [
          "Recruitment & Selection",
          "Training & Development",
          "Compensation & Benefits",
          "Employee Relations",
        ],
      },
      {
        year: "Year 3",
        description: "Advanced HR applications",
        subjects: [
          "Performance Management",
          "Industrial Relations",
          "Strategic HR Management",
          "HR Analytics",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Vol.5(7) (07/27)",
    courseCode: "R/345/4/1054 MQA/FA 8536",
  },
  {
    id: "business-management-diploma-ucmi",
    title: "Diploma in Business Management",
    category: "Business",
    description:
      "Comprehensive business management program preparing students for careers in business administration and management",
    overview:
      "This program provides essential knowledge and skills for business management in various industries",
    duration: "2 years 6 months",
    level: "Diploma",
    accreditation: "Malaysian Qualifications Agency",
    career: "Business Administrator, Management Trainee, Operations Supervisor",
    tuitionFee: 22000,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "ELIGIBLE to obtain a Malaysian Certificate of Education (SPM) or an equivalent qualification with at least CREDIT in three (3) subjects",
        "OR",
        "PASS the Malaysian Higher School Certificate (STPM) with a minimum grade of C (NGMP 2.0) in any subject or an equivalent qualification",
        "OR",
        "PASS the Malaysian Higher Certificate of Religion (STAM) with a minimum grade of Maqbul",
        "OR",
        "PASS Level 3 of the Malaysian Skills Certificate (SKM) in the relevant field AND PASS the Malaysian Certificate of Education (SPM) with a minimum of one (1) CREDIT in any subject",
        "OR",
        "Other qualifications equivalent to a Certificate (Level 3 of the Malaysian Qualifications Framework, KKM)",
      ],
      english: ["PASS in English"],
      other: [],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in business management",
        subjects: [
          "Principles of Management",
          "Business Economics",
          "Marketing Fundamentals",
          "Financial Accounting",
        ],
      },
      {
        year: "Year 2",
        description: "Intermediate business practices",
        subjects: [
          "Business Law",
          "Human Resource Management",
          "Operations Management",
          "Business Statistics",
        ],
      },
      {
        year: "Final Semester",
        description: "Advanced business applications",
        subjects: [
          "Strategic Management",
          "Entrepreneurship",
          "International Business",
          "Business Ethics",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Jld.3(12) (02/24)",
    courseCode: "N/345/4/1114 MQA/PA 9917",
  },
  {
    id: "psychology-diploma-ucmi",
    title: "Diploma in Psychology",
    category: "Social Sciences",
    description:
      "Comprehensive psychology program preparing students for careers in mental health and human behavior",
    overview:
      "This program provides essential knowledge and skills for understanding human behavior and psychological principles",
    duration: "2 years 7 months (FT) / 4 years (PT)",
    level: "Diploma",
    accreditation: "Malaysian Qualifications Agency",
    career:
      "Psychology Assistant, Counseling Assistant, Human Resource Officer",
    tuitionFee: 25500,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "ELIGIBLE to obtain a Malaysian Certificate of Education (SPM) with at least CREDIT in three (3) subjects with a PASS in Mathematics AND Biology/ Chemistry/ Physics/ General Science/ Applied Science",
        "OR",
        "PASS the Malaysian Higher Secondary School Certificate (STPM) with a minimum grade of C (NGMP 2.0) in any subject AND PASS Mathematics AND Biology/Chemistry/Physics/General Science/Applied Science in the Malaysian Certificate of Education (SPM)",
        "OR",
        "PASS the Malaysian Higher Certificate of Religion (STAM) with a minimum grade of Maqbul AND PASS Mathematics AND Biology/Chemistry/Physics/General Science/Applied Science in the Malaysian Certificate of Education (SPM)",
        "OR",
        "PASS the Certificate (Level 3 Malaysian Qualification Framework, KKM) in the relevant field with a minimum CGPA of 2.00 AND PASS Mathematics AND Biology/Chemistry/Physics/General Science/Applied Science in the Malaysian Certificate of Education (SPM)",
        "OR",
        "PASS Level 3 Malaysian Skills Certificate (SKM) in related fields AND PASS Mathematics AND Biology/Chemistry/Physics/General Science/Applied Science in the Certificate of Education Malaysia (SPM)",
        "OR",
        "Other qualifications, experience and equivalent or relevant conditions accepted by the Malaysian Government",
      ],
      english: ["PASS in English"],
      other: [],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in psychology",
        subjects: [
          "Introduction to Psychology",
          "Developmental Psychology",
          "Cognitive Psychology",
          "Research Methods",
        ],
      },
      {
        year: "Year 2",
        description: "Intermediate psychological principles",
        subjects: [
          "Social Psychology",
          "Abnormal Psychology",
          "Personality Theories",
          "Psychological Assessment",
        ],
      },
      {
        year: "Final Semester",
        description: "Applied psychology",
        subjects: [
          "Counseling Psychology",
          "Industrial-Organizational Psychology",
          "Cross-Cultural Psychology",
          "Psychology Practicum",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Jld.4(36) (06/28)",
    courseCode: "N/311/4/0125 MQ A/PA 14538",
  },
  {
    id: "retail-management-diploma-ucmi",
    title: "Diploma in Retail Management",
    category: "Business",
    description:
      "Comprehensive retail management program preparing students for careers in retail operations and management",
    overview:
      "This program provides essential knowledge and skills for retail business management and customer service",
    duration: "3 years",
    level: "Diploma",
    accreditation: "Malaysian Qualifications Agency",
    career: "Retail Manager, Store Supervisor, Merchandising Specialist",
    tuitionFee: 23000,
    intakes: ["January", "July"],
    campuses: ["Main Campus"],
    featured: true,
    university: {
      name: "MAIWP International University College",
      logo: "/images/ucmi-logo.png",
      location: "Malaysia",
    },
    requirements: {
      academic: [
        "HAS Sijil Pelajaran Malaysia (SPM) or an equivalent qualification with at least CREDIT in three (3) subjects",
        "OR",
        "PASS the Certificate (Level 3 of the Malaysian Qualifications Framework, KKM) or an equivalent qualification in a related field with at least a CGPA of 2.00",
        "OR",
        "PASS Level 3 of the Malaysian Skills Certificate (SKM) in the relevant field",
      ],
      english: ["PASS in English"],
      other: [
        "Admission of SKM Graduates (Level 3 KKM) to Diploma (Level 4 KKM) or equivalent by implementing screening and strengthening programs appropriate to the program area",
      ],
    },
    curriculum: [
      {
        year: "Year 1",
        description: "Foundation in retail management",
        subjects: [
          "Retail Principles",
          "Customer Service",
          "Merchandising Basics",
          "Retail Marketing",
        ],
      },
      {
        year: "Year 2",
        description: "Intermediate retail operations",
        subjects: [
          "Retail Operations",
          "Inventory Management",
          "Visual Merchandising",
          "Retail Technology",
        ],
      },
      {
        year: "Year 3",
        description: "Advanced retail management",
        subjects: [
          "Retail Strategy",
          "E-commerce",
          "Retail Leadership",
          "Retail Practicum",
        ],
      },
    ],
    reference: "JPT/BPP(U)1000-801/56 Jld.5(35) (02/28)",
    courseCode: "N-TVET/041/4/0037 TVET/QP 8476",
  },
];

// Export individual programs by ID for easy access
export const programsById = programs.reduce((acc, program) => {
  acc[program.id] = program;
  return acc;
}, {} as Record<string, (typeof programs)[0]>);

// Default export for backward compatibility
export default programs;
