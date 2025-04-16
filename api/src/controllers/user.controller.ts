import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).json({ message: 'Error retrieving users' });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(`Error getting user by id: ${req.params.id}`, error);
      res.status(500).json({ message: 'Error retrieving user' });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const updatedUser = await this.userService.updateUser(userId, userData);
      
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(`Error updating user: ${req.params.id}`, error);
      res.status(500).json({ message: 'Error updating user' });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      const success = await this.userService.deleteUser(userId);
      
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(`Error deleting user: ${req.params.id}`, error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };
}