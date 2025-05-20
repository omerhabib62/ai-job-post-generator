export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface JobPost {
  _id?: string;
  title: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
  jobType: string;
  createdBy?: User | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GenerateJobPostRequest {
  company: string;
  role: string;
  technologies?: string[];
  location?: string;
  jobType?: string;
}
