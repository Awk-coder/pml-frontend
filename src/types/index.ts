export interface University {
  _id: string;
  name: string;
  location: string;
  country: string;
  logo?: string;
  coverImage?: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  yearEstablished: string;
  accreditationNumber: string;
}

export interface Program {
  _id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  tuitionFee: number;
  // Add other program properties as needed
} 