import { PrismaClient } from '@prisma/client';
import { Project } from '../models/project.model';

// Use the same PrismaClient instance that's created in the user repository
// In a production app, you would use a shared instance from a database module
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findById(projectId: number): Promise<Project | null>;
  findByCustomerId(customerId: number): Promise<Project[]>;
  create(project: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  update(projectId: number, projectData: Partial<Project>): Promise<Project | null>;
  delete(projectId: number): Promise<boolean>;
}

export class PrismaProjectRepository implements ProjectRepository {
  async findAll(): Promise<Project[]> {
    return prisma.project.findMany();
  }

  async findById(projectId: number): Promise<Project | null> {
    return prisma.project.findUnique({
      where: { projectId }
    });
  }

  async findByCustomerId(customerId: number): Promise<Project[]> {
    return prisma.project.findMany({
      where: { customerId }
    });
  }

  async create(projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return prisma.project.create({
      data: projectData
    });
  }

  async update(projectId: number, projectData: Partial<Project>): Promise<Project | null> {
    return prisma.project.update({
      where: { projectId },
      data: projectData
    });
  }

  async delete(projectId: number): Promise<boolean> {
    try {
      await prisma.project.delete({
        where: { projectId }
      });
      return true;
    } catch (error) {
      console.error(`Error deleting project ${projectId}:`, error);
      return false;
    }
  }
}