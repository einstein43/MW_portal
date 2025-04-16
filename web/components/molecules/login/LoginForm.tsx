import React, { useState } from 'react';
import { AuthService } from '../../../services/auth.service';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onLoginSuccess?: () => void;
  onLoginError?: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onLoginSuccess, 
  onLoginError 
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await AuthService.login({ username, password });
      
      if (user) {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        const errorMessage = 'Login failed. Please check your credentials.';
        setError(errorMessage);
        if (onLoginError) {
          onLoginError(errorMessage);
        }
      }
    } catch (err) {
      const errorMessage = `An error occurred during login: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`;
      setError(errorMessage);
      if (onLoginError) {
        onLoginError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>Login</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;