import { PrismaClient } from '@prisma/client';
import { Project } from '../models/project.model';

// Use the singleton PrismaClient instance from the index.ts file
// to avoid multiple connections
export interface ProjectRepository {
  findAll(): Promise<Project[]>;
  findById(projectId: number): Promise<Project | null>;
  findByCustomerId(customerId: number): Promise<Project[]>;
  create(project: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  update(projectId: number, projectData: Partial<Project>): Promise<Project | null>;
  delete(projectId: number): Promise<boolean>;
}

export class PrismaProjectRepository implements ProjectRepository {
  private prisma: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    // Use the passed PrismaClient or create a new one as fallback (not ideal, but safer)
    this.prisma = prismaClient || new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findById(projectId: number): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { projectId }
    });
  }

  async findByCustomerId(customerId: number): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { customerId }
    });
  }

  async create(projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return this.prisma.project.create({
      data: projectData
    });
  }

  async update(projectId: number, projectData: Partial<Project>): Promise<Project | null> {
    return this.prisma.project.update({
      where: { projectId },
      data: projectData
    });
  }

  async delete(projectId: number): Promise<boolean> {
    try {
      await this.prisma.project.delete({
        where: { projectId }
      });
      return true;
    } catch (error) {
      console.error(`Error deleting project ${projectId}:`, error);
      return false;
    }
  }
}