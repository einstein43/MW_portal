import express, { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';

export const createProjectRouter = (projectController: ProjectController): Router => {
  const router = express.Router();

  // Protected routes - require authentication
  router.get('/',  projectController.getAllProjects);
  // More specific route comes first
  router.get('/customer/:customerId',  projectController.getProjectsByCustomerId);
  // General ID route comes after specific routes
  router.get('/:id',  projectController.getProjectById);
  router.post('/',  projectController.createProject);
  router.put('/:id',  projectController.updateProject);
  router.delete('/:id',  projectController.deleteProject);

  return router;
};