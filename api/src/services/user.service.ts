import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // In a real application, you would hash the password here
    return this.userRepository.create(userData);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    // You might want to prevent updates to certain fields like password without verification
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}