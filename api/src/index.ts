import express from 'express';
import { MockUserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { createUserRouter } from './routes/user.routes';
import cors from 'cors';

// Create Express app
const app = express();
const port = process.env.PORT || 3002; // Changed to port 3002 to avoid conflicts

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS middleware to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from Next.js frontend
  credentials: true
}));

// Initialize dependencies
const userRepository = new MockUserRepository();
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
});

export default app;