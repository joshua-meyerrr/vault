import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');

  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials = await response.json();
    setCredentials(credentials);
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredentials([]);
    }
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Vault 🕋</h1>
      <Link className={styles.destruction} to="/selfdestruction">
        Start Self-Destruction 💣
      </Link>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetchCredentials();
        }}
      >
        <input
          className={styles.input}
          type="password"
          placeholder="Enter masterpassword..."
          value={masterPassword}
          onChange={(event) => setMasterPassword(event.target.value)}
        />
        <button>🔓</button>
      </form>
      <p className={styles.yourPasswords}>Your passwords:</p>
      <Link to="/passwords/google">Test Link to Google PW</Link>
      {credentials.map((credential) => (
        <CredentialCard credential={credential} />
      ))}
    </main>
  );
}
