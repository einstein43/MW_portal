import express from 'express';
import { MockUserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { createUserRouter } from './routes/user.routes';

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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