import { User } from '../models/user.model';
 
import { PrismaClient } from '@prisma/client';

// Create a single PrismaClient instance to be reused
// This approach doesn't rely on global variables that might not work in all environments
const prisma = new PrismaClient({
  // Enable logging in development environment
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Initialize the client immediately
prisma.$connect()
  .then(() => console.log('PrismaClient connected successfully'))
  .catch(e => console.error('PrismaClient connection error:', e));

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(id: number, userData: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}

// Mock implementation for demonstration
export class MockUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'test@example.com',
      password: 'password123', // In a real app, this would be hashed
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async findById(id: number): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: this.users.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date()
    };
    return this.users[index];
  }

  async delete(id: number): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return initialLength !== this.users.length;
  }
}

// Implement Prisma-based repository
export class PrismaUserRepository implements UserRepository {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return prisma.user.create({
      data: userData
    });
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    return prisma.user.update({
      where: { id },
      data: userData
    });
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}