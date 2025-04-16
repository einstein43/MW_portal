'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../../components/molecules/login/LoginForm';
import { AuthService } from '../../services/auth.service';
import styles from './page.module.css';

export default function Login() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    if (AuthService.isAuthenticated()) {
      router.push('/dashboard'); // Redirect to dashboard if authenticated
    }
  }, [router]);

  const handleLoginSuccess = () => {
    setMessage('Login successful! Redirecting...');
    setTimeout(() => {
      router.push('/dashboard'); // Redirect to dashboard after successful login
    }, 1000);
  };

  const handleLoginError = (error: string) => {
    setMessage(error);
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1>Welcome Back</h1>
        {message && <div className={message.includes('successful') ? styles.successMessage : styles.errorMessage}>{message}</div>}
        <LoginForm 
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
        />
      </div>
    </div>
  );
}