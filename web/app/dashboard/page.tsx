'use client';

import { useState, useEffect } from 'react';
import { AuthService, User } from '../../services/auth.service';
import ProtectedRoute from '../../components/organisms/ProtectedRoute';
import styles from './page.module.css';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user from auth service
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
  };

  return (
    <ProtectedRoute>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Uitloggen
          </button>
        </header>

        <div className={styles.content}>
          {loading ? (
            <div>Laden...</div>
          ) : (
            <>
              <div className={styles.welcomeMessage}>
                <h2>Welkom {user?.email?.split('@')[0] || 'User'}!</h2>
                <p>TEST!!</p>
              </div>

              <div className={styles.dashboardCard}>
                <h3>Gegevens</h3>
                {user && (
                  <div className={styles.profileInfo}>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>User ID:</strong> {user.id}</p>
                    
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}