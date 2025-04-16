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
        // Flag to track if the component is mounted
        let isMounted = true;
        
        const fetchProjects = async () => {
            try {
                // Check authentication first
                const token = AuthService.getToken();
                if (!token) {
                    console.error('No authentication token found');
                    throw new Error('No authentication token');
                }
                
                const currentUser = AuthService.getCurrentUser();
                
                if (!currentUser) {
                    console.error('User not authenticated');
                    throw new Error('User not authenticated');
                }
                
                console.log('Current user:', currentUser);
                
                // Use the user's ID as the customer ID
                const customerId = parseInt(currentUser.id);
                if (isNaN(customerId)) {
                    console.error(`Invalid user ID: ${currentUser.id}`);
                    throw new Error('Invalid user ID format');
                }
                
                console.log(`Fetching projects for customer ID: ${customerId}`);
                
                // Add a leading slash to ensure proper URL path resolution
                const apiEndpoint = `/projects/customer/${customerId}`;
                console.log('API request URL:', apiEndpoint);
                
                // Use an AbortController to cancel the request if needed
                const controller = new AbortController();
                const signal = controller.signal;
                
                const response = await ApiService.get<Project[]>(apiEndpoint, {
                    signal
                });
                
                console.log('API response:', response);
                
                // Only update state if the component is still mounted
                if (isMounted) {
                    setProjects(response.data);
                }
            } catch (err: any) {
                // Only update error state if the component is still mounted
                // and it's not an abort error
                if (isMounted && err.name !== 'AbortError') {
                    console.error('Error fetching projects:', err);
                    // Log detailed API error information if available
                    if (err.response) {
                        console.error('API error details:', {
                            status: err.response.status,
                            statusText: err.response.statusText,
                            data: err.response.data,
                            message: err.message,
                            code: err.code
                        });
                    }
                    setError(err.message || 'Failed to fetch project data');
                }
            } finally {
                // Only update loading state if the component is still mounted
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProjects();
        
        // Cleanup function to run when the component unmounts
        return () => {
            isMounted = false;
        };
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