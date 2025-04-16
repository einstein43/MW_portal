import { User } from '../models/user.model';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: string, userData: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

// Mock implementation for demonstration
export class MockUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123', // In a real app, this would be hashed
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: (this.users.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date()
    };
    return this.users[index];
  }

  async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return initialLength !== this.users.length;
  }
}