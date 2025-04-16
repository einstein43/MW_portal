export interface User {
  id: number;
  email: string;
  password: string; // In a real application, this would be hashed
  firstName: string | null;  // Changed from optional (string | undefined) to string | null
  lastName: string | null;   // Changed from optional (string | undefined) to string | null
  role: string;
  createdAt: Date;
  updatedAt: Date;
}