import { Project } from '../models/project.model';
import { ProjectRepository } from '../repositories/project.repository';

export class ProjectService {
  constructor(private projectRepository: ProjectRepository) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getProjectById(projectId: number): Promise<Project | null> {
    return this.projectRepository.findById(projectId);
  }

  async getProjectsByCustomerId(customerId: number): Promise<Project[]> {
    return this.projectRepository.findByCustomerId(customerId);
  }

  async createProject(projectData: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return this.projectRepository.create(projectData);
  }

  async updateProject(projectId: number, projectData: Partial<Project>): Promise<Project | null> {
    return this.projectRepository.update(projectId, projectData);
  }

  async deleteProject(projectId: number): Promise<boolean> {
    return this.projectRepository.delete(projectId);
  }
}