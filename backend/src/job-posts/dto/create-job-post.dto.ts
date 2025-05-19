import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateJobPostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsOptional()
  technologies?: string[];

  @IsString()
  @IsNotEmpty()
  jobType: string;
}
