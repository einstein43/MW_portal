import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    
    // If user not found or password doesn't match, return null
    // In a real application, you would use bcrypt to compare hashed passwords
    if (!user || user.password !== password) {
      return null;
    }
    
    return user;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // In a real application, you would hash the password here
    return this.userRepository.create(userData);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    // You might want to prevent updates to certain fields like password without verification
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}