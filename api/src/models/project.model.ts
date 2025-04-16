export interface Project {
  projectId: number;
  customerId: number;
  progress: string | null;  // Changed from string | undefined to string | null
  startDate: Date | null;   // Changed from Date | undefined to Date | null
  createdAt: Date;
  updatedAt: Date;
}