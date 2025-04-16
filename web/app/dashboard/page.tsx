"use client";

import { useState, useEffect } from "react";
import { AuthService, User } from "../../services/auth.service";
import ProtectedRoute from "../../components/organisms/ProtectedRoute";
import styles from "./page.module.css";
import ProgressBlock from "@/components/molecules/progress/ProgressBlock";

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
    window.location.href = "/login";
  };

  return (
    <ProtectedRoute>
      <div className={styles.dashboardContainer}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <div className={styles.userInfo}>
            <div className={styles.dashboardCard}>
              {user && (
                <><h3>Welkom {user.firstName} !</h3>
                <div className={styles.profileInfo}>
                  
                  <p>{user.email}</p>
                </div></>
              )}
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Uitloggen
            </button>
          </div>
        </header>

        <div className={styles.content}>
          {loading ? (
            <div>Laden...</div>
          ) : (
            <>
              <div className={styles.welcomeMessage}>
                <ProgressBlock></ProgressBlock>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
