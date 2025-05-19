import api from '../utils/api';
import type { JobPost, GenerateJobPostRequest } from '../types';

export const jobPostService = {
  getAllJobPosts: async (): Promise<JobPost[]> => {
    const response = await api.get<JobPost[]>('/job-posts');
    return response.data;
  },
  
  getJobPostById: async (id: string): Promise<JobPost> => {
    const response = await api.get<JobPost>(`/job-posts/${id}`);
    return response.data;
  },
  
  getMyJobPosts: async (): Promise<JobPost[]> => {
    const response = await api.get<JobPost[]>('/job-posts/my-posts');
    return response.data;
  },
  
  createJobPost: async (jobPost: JobPost): Promise<JobPost> => {
    const response = await api.post<JobPost>('/job-posts', jobPost);
    return response.data;
  },
  
  updateJobPost: async (id: string, jobPost: JobPost): Promise<JobPost> => {
    const response = await api.put<JobPost>(`/job-posts/${id}`, jobPost);
    return response.data;
  },
  
  deleteJobPost: async (id: string): Promise<void> => {
    await api.delete(`/job-posts/${id}`);
  },
  
  generateJobPost: async (data: GenerateJobPostRequest): Promise<JobPost> => {
    const response = await api.post<JobPost>('/job-posts/generate', data);
    return response.data;
  },
};
