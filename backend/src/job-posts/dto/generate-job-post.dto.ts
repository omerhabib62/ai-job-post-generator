import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class GenerateJobPostDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsArray()
  @IsOptional()
  technologies?: string[];

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  jobType?: string;
}
