import React, { useState, useEffect } from 'react';
import styles from './ProgressBlock.module.css';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';

interface Project {
  projectId: number;
  customerId: number;
  progress: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
}

const ProgressBlock: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const currentUser = AuthService.getCurrentUser();
                
                if (!currentUser) {
                    throw new Error('User not authenticated');
                }
                
                // Use the user's ID as the customer ID
                const customerId = parseInt(currentUser.id);
                
                const response = await ApiService.get<Project[]>(`/projects/customer/${customerId}`);
                setProjects(response.data);
            } catch (err: any) {
                console.error('Error fetching projects:', err);
                setError(err.message || 'Failed to fetch project data');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div className={styles.progressBlock}>Loading project data...</div>;
    if (error) return <div className={styles.progressBlock}>Error: {error}</div>;
    if (projects.length === 0) return <div className={styles.progressBlock}>No projects found</div>;

    return (
        <div className={styles.progressBlock}>
            <h2>Your Project Progress</h2>
            {projects.map((project) => (
                <div key={project.projectId} className={styles.projectItem}>
                    <h3>Project #{project.projectId}</h3>
                    <div className={styles.progressInfo}>
                        <div className={styles.progressLabel}>Status:</div>
                        <div className={styles.progressValue}>{project.progress || 'Not set'}</div>
                    </div>
                    <div className={styles.progressInfo}>
                        <div className={styles.progressLabel}>Start Date:</div>
                        <div className={styles.progressValue}>
                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBlock;