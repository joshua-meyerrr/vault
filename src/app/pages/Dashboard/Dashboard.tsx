import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    async function fetchCredentials() {
      const response = await fetch('/api/credentials', {
        headers: {
          Authorization: 'lmao',
        },
      });
      const credentials = await response.json();
      setCredentials(credentials);
    }
    fetchCredentials();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Vault 🕋</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter service..."
      />
      <p className={styles.yourPasswords}>Your passwords:</p>
      <Link className={styles.destruction} to="/selfdestruction">
        Start Self-Destruction 💣
      </Link>
      <Link to="/passwords/google">Test Link to Google PW</Link>
      {credentials?.forEach((credential) => console.log(credential))}
    </main>
  );
}
