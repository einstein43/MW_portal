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
            Logout
          </button>
        </header>

        <div className={styles.content}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className={styles.welcomeMessage}>
                <h2>Welcome, {user?.username}!</h2>
                <p>You are now signed in to your account.</p>
              </div>

              <div className={styles.dashboardCard}>
                <h3>Your Profile</h3>
                {user && (
                  <div className={styles.profileInfo}>
                    <p><strong>Username:</strong> {user.username}</p>
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