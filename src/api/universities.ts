// This is a mock implementation - in a real app, this would call your backend API
export const getUniversityById = async (id: string) => {
  // For now, return mock data
  return {
    _id: id,
    name: "UCMI University",
    location: "Kuala Lumpur",
    country: "Malaysia",
    logo: "https://via.placeholder.com/150",
    coverImage: "https://via.placeholder.com/1200x400",
    description: "A leading institution for healthcare education with innovative programs in nursing, pharmacy, and more.",
    contactEmail: "admissions@ucmi.edu.my",
    contactPhone: "+60 3 1234 5678",
    website: "https://www.ucmi.edu.my",
    yearEstablished: "1995",
    accreditationNumber: "MQA/FA1234",
  };
}; 