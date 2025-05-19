# AI-Powered Job Post Generator

A full-stack web application that allows users to generate professional job descriptions using AI. Built with React, Tailwind CSS, NestJS, and MongoDB.

## Features

- 🤖 AI-generated job descriptions based on simple inputs
- 🔒 User authentication with JWT
- 👤 User roles (regular user and admin)
- 💾 Save and manage generated job posts
- 📋 Copy job descriptions to clipboard
- 🖥️ Responsive design for all devices

## Tech Stack

### Frontend
- React 19 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- React Hot Toast for notifications

### Backend
- NestJS with TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Validation with class-validator

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository
```bash
git clone https://github.com/omerhabib62/job-post-generator.git
cd job-post-generator
```

2. Install backend dependencies
```bash
cd backend
npm install
cp .env.example .env
# Update the .env file with your MongoDB connection string and JWT secret
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run start:dev
cp .env.example .env
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Using the Utility Script
We've included a convenient shell script to run common frontend tasks:
```bash
# Make the script executable (first time only)
chmod +x run.sh

# Start development server
./run.sh dev

# Run tests
./run.sh test

# Build for production
./run.sh build

# Preview production build
./run.sh preview

# Show help
./run.sh help
```

### Manual Commands
1. Start the backend server
```bash
cd backend
npm run start:dev
```
2. Start the frontend development server
```bash
cd frontend
npm run dev
```
3. Open your browser and navigate to http://localhost:5173.

## Project Structure

### Backend
- `src/auth`: Authentication module
- `src/users`: User management
- `src/job-posts`: Job post generation and management
- `src/config`: Application configuration

### Frontend
- `src/components`: Reusable UI components
- `src/pages`: Page components
- `src/contexts`: React contexts
- `src/services`: API services
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions

### Troubleshooting
If you encounter issues with the application:

White Screen Issue: Check browser console for errors
Type Import Errors: When using verbatimModuleSyntax in TypeScript config, use type-only imports:
```bash
// Correct way to import types
import type { AuthResponse } from './types';
```

## API Documentation

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### Job Posts
- `GET /api/job-posts`: Get all job posts
- `GET /api/job-posts/:id`: Get a specific job post
- `GET /api/job-posts/my-posts`: Get current user's job posts
- `POST /api/job-posts`: Create a new job post
- `POST /api/job-posts/generate`: Generate a job post using AI
- `PUT /api/job-posts/:id`: Update a job post
- `DELETE /api/job-posts/:id`: Delete a job post

## License

This project is licensed under the MIT License.
