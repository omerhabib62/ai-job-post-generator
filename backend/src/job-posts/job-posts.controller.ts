import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JobPostsService } from './job-posts.service';
import { CreateJobPostDto } from './dto/create-job-post.dto';
import { GenerateJobPostDto } from './dto/generate-job-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';

@Controller('job-posts')
export class JobPostsController {
  constructor(private readonly jobPostsService: JobPostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.jobPostsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-posts')
  async findMyPosts(@Request() req) {
    return this.jobPostsService.findByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.jobPostsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createJobPostDto: CreateJobPostDto, @Request() req) {
    return this.jobPostsService.create(createJobPostDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate')
  async generate(@Body() generateJobPostDto: GenerateJobPostDto) {
    return this.jobPostsService.generateJobPost(generateJobPostDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobPostDto: CreateJobPostDto,
  ) {
    return this.jobPostsService.update(id, updateJobPostDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.jobPostsService.delete(id);
  }
}
