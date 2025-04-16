// This is a mock implementation - in a real app, this would call your backend API
export const getProgramsByUniversity = async (universityId: string) => {
  // For now, return mock data
  return [
    {
      _id: "prog1",
      title: "Bachelor of Medicine and Surgery",
      description: "Comprehensive medical program covering all aspects of human health",
      level: "Bachelor's",
      duration: "6 years",
      tuitionFee: 45000,
    },
    {
      _id: "prog2",
      title: "Diploma in Nursing",
      description: "Professional nursing program with hands-on clinical experience",
      level: "Diploma",
      duration: "3 years",
      tuitionFee: 25000,
    },
    {
      _id: "prog3",
      title: "Master of Public Health",
      description: "Advanced study in public health policy and management",
      level: "Master's",
      duration: "2 years",
      tuitionFee: 35000,
    }
  ];
}; 