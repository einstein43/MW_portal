import { Request, Response } from 'express';
import { ProjectService } from '../services/project.service';

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  getAllProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const projects = await this.projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error('Error getting all projects:', error);
      res.status(500).json({ message: 'Error retrieving projects' });
    }
  };

  getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = parseInt(req.params.id, 10);
      const project = await this.projectService.getProjectById(projectId);
      
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      console.error(`Error getting project by id: ${req.params.id}`, error);
      res.status(500).json({ message: 'Error retrieving project' });
    }
  };

  getProjectsByCustomerId = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerId = parseInt(req.params.customerId, 10);
      console.log(`Processing request for customer ID: ${customerId}`);
      
      // Validate customer ID is a valid number
      if (isNaN(customerId)) {
        console.error(`Invalid customer ID: ${req.params.customerId}`);
        res.status(400).json({ message: 'Invalid customer ID format' });
        return;
      }
      
      const projects = await this.projectService.getProjectsByCustomerId(customerId);
      console.log(`Found ${projects.length} projects for customer ID: ${customerId}`);
      
      res.status(200).json(projects);
    } catch (error) {
      console.error(`Error getting projects by customer id: ${req.params.customerId}`, error);
      res.status(500).json({ message: 'Error retrieving projects for customer' });
    }
  };

  createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectData = req.body;
      const newProject = await this.projectService.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ message: 'Error creating project' });
    }
  };

  updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = parseInt(req.params.id, 10);
      const projectData = req.body;
      const updatedProject = await this.projectService.updateProject(projectId, projectData);
      
      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      console.error(`Error updating project: ${req.params.id}`, error);
      res.status(500).json({ message: 'Error updating project' });
    }
  };

  deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const projectId = parseInt(req.params.id, 10);
      const success = await this.projectService.deleteProject(projectId);
      
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      console.error(`Error deleting project: ${req.params.id}`, error);
      res.status(500).json({ message: 'Error deleting project' });
    }
  };
}