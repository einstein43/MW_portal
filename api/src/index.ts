import express from 'express';
import { PrismaUserRepository } from './repositories/user.repository';
import { PrismaProjectRepository } from './repositories/project.repository';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';
import { UserController } from './controllers/user.controller';
import { ProjectController } from './controllers/project.controller';
import { createUserRouter } from './routes/user.routes';
import { createProjectRouter } from './routes/project.routes';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// Create Express app
const app = express();
const port = parseInt(process.env.PORT || '3002', 10);

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS middleware with more permissive configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['http://web:3000', 'http://localhost:3001'] // Allow both Docker service and local access
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003'], // Development access
  credentials: true
}));

// Create a singleton PrismaClient instance
const prisma = new PrismaClient();

async function startServer() {
  try {
    console.log('Connecting to the database...');
    await prisma.$connect();
    console.log('Database connection established.');

    // Initialize dependencies
    const userRepository = new PrismaUserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    // Initialize project dependencies
    const projectRepository = new PrismaProjectRepository();
    const projectService = new ProjectService(projectRepository);
    const projectController = new ProjectController(projectService);

    // Setup routes
    app.use('/api/users', createUserRouter(userController));
    app.use('/api/projects', createProjectRouter(projectController));

    // Basic welcome route
    app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the Express TypeScript API with layered architecture' });
    });

    // Start the server
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Database URL: ${process.env.DATABASE_URL || 'Not set'}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

startServer();

export default app;