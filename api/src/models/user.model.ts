export interface User {
  id: number;
  email: string;
  password: string; // In a real application, this would be hashed
  firstName?: string;
  lastName?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}