import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { UserRole } from './users/schemas/user.schema';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const usersService = app.get(UsersService);
  const connection = app.get(getConnectionToken());

  console.log('Starting to seed database...');

  try {
    // Create admin user
    const admin = await usersService.create(
      'Admin User',
      'admin@example.com',
      'adminPassword123',
      UserRole.ADMIN,
    );
    console.log('Admin user created:', admin.email);

    // Create regular user
    const user = await usersService.create(
      'Regular User',
      'user@example.com',
      'userPassword123',
      UserRole.USER,
    );
    console.log('Regular user created:', user.email);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection and application
    await connection.close();
    await app.close();
  }
}

bootstrap();
