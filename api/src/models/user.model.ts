export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // In a real application, this would be hashed
  createdAt: Date;
  updatedAt: Date;
}