import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

export const createUserRouter = (userController: UserController): Router => {
  const router = express.Router();

  // Public routes
  router.post('/', userController.createUser);
  
  // Protected routes - require authentication
  router.get('/', authenticate, userController.getAllUsers);
  router.get('/:id', authenticate, userController.getUserById);
  router.put('/:id', authenticate, userController.updateUser);
  router.delete('/:id', authenticate, userController.deleteUser);

  return router;
};