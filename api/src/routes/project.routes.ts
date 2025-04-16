import express, { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticate } from '../middleware/auth.middleware';

export const createProjectRouter = (projectController: ProjectController): Router => {
  const router = express.Router();

  // Protected routes - require authentication
  router.get('/', authenticate, projectController.getAllProjects);
  router.get('/:id', authenticate, projectController.getProjectById);
  router.get('/customer/:customerId', authenticate, projectController.getProjectsByCustomerId);
  router.post('/', authenticate, projectController.createProject);
  router.put('/:id', authenticate, projectController.updateProject);
  router.delete('/:id', authenticate, projectController.deleteProject);

  return router;
};