import { 
  Controller, 
  Post, 
  Body, 
  BadRequestException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      if (error.message === 'User with this email already exists') {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
