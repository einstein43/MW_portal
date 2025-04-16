import { Request, Response, NextFunction } from 'express';

// This is a simplified version for demonstration
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ message: 'Token not provided' });
    return;
  }

  try {
    // In a real app, you'd verify the token with JWT or another method
    if (token === 'demo-token') {
      // Mock user data that would normally come from token verification
      (req as any).user = { id: '1', username: 'testuser' };
      next();
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
};