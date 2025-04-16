import express from 'express';
import { PrismaUserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { createUserRouter } from './routes/user.routes';
import cors from 'cors';

// Create Express app
const app = express();
const port = process.env.PORT || 3002;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS middleware to allow requests from frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'http://web:3000' // Docker service name in production
    : 'http://localhost:3000', // Local development
  credentials: true
}));

// Initialize dependencies
const userRepository = new PrismaUserRepository(); // Using Prisma repository instead of mock
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Setup routes
app.use('/api/users', createUserRouter(userController));

// Basic welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express TypeScript API with layered architecture' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Database URL: ${process.env.DATABASE_URL || 'Not set'}`);
});

export default app;