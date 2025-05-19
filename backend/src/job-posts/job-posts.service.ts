import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobPost, JobPostDocument } from './schemas/job-post.schema';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { GenerateJobPostDto } from './dto/generate-job-post.dto';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectModel(JobPost.name) private readonly jobPostModel: Model<JobPostDocument>,
  ) {}

  async findAll(): Promise<JobPostDocument[]> {
    return this.jobPostModel.find().populate('createdBy', '-password').exec();
  }

  async findById(id: string): Promise<JobPostDocument> {
    return this.jobPostModel.findById(id).populate('createdBy', '-password').exec();
  }

  async findByUser(userId: string): Promise<JobPostDocument[]> {
    return this.jobPostModel.find({ createdBy: userId }).populate('createdBy', '-password').exec();
  }

  async create(createJobPostDto: CreateJobPostDto, userId: string): Promise<JobPostDocument> {
    const newJobPost = new this.jobPostModel({
      ...createJobPostDto,
      createdBy: userId,
    });
    return newJobPost.save();
  }

  async update(id: string, updateJobPostDto: CreateJobPostDto): Promise<JobPostDocument> {
    return this.jobPostModel
      .findByIdAndUpdate(id, updateJobPostDto, { new: true })
      .populate('createdBy', '-password')
      .exec();
  }

  async delete(id: string): Promise<JobPostDocument> {
    return this.jobPostModel.findByIdAndDelete(id).exec();
  }

  async generateJobPost(generateJobPostDto: GenerateJobPostDto): Promise<any> {
    // This would be replaced with actual AI integration
    // For now, we'll just create a mock response
    const { company, role, technologies = [], location = 'Remote', jobType = 'Full-time' } = generateJobPostDto;
    
    // Mock AI-generated job description
    const techStack = technologies.join(', ');
    
    const description = `
## About ${company}
${company} is a leading company in the tech industry, committed to innovation and excellence.

## Role: ${role}
We're looking for an experienced ${role} to join our growing team.

## Responsibilities:
- Design, develop, and maintain high-quality software solutions
- Collaborate with cross-functional teams to define, design, and ship new features
- Identify and address performance bottlenecks
- Write clean, maintainable, and efficient code

## Requirements:
- Proven experience as a ${role}
- Strong proficiency in ${techStack}
- Problem-solving aptitude
- Team player with excellent communication skills
- Passion for best coding practices

## Location: ${location}
## Job Type: ${jobType}
    `;

    return {
      title: `${role} at ${company}`,
      company,
      location,
      description,
      technologies,
      jobType,
    };
  }
}
