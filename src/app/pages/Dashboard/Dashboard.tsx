import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import type { Credential } from '../../../types';
import CredentialCard from '../../components/CredentialCard/CredentialCard';
import AddButton from '../../components/AddButton/AddButton';

export default function Dashboard(): JSX.Element {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [masterPassword, setMasterPassword] = useState('');
  const [displayButton, setDisplayButton] = useState(false);

  async function fetchCredentials() {
    const response = await fetch('/api/credentials', {
      headers: {
        Authorization: masterPassword,
      },
    });
    const credentials = await response.json();
    setCredentials(credentials);
    if (credentials.length > 0) {
      setDisplayButton(!displayButton);
    }
  }

  async function deleteCredential(service: string, masterPassword: string) {
    await fetch(`/api/credentials/${service}`, {
      method: 'DELETE',
      headers: { Authentication: masterPassword },
    });
  }

  async function handleDeleteClick(service: string) {
    await deleteCredential(service, masterPassword);
    await fetchCredentials();
  }

  useEffect(() => {
    if (!masterPassword) {
      setCredentials([]);
    }
  }, [masterPassword]);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Vault</h1>
      <Link className={styles.destruction} to="/selfdestruction">
        Self-Destruction 💣
      </Link>
      <form
        className={styles.form}
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
        <button className={styles.btn}>🔓</button>
      </form>
      <Link to="/search">Search Service</Link>
      {credentials.map((credential) => (
        <CredentialCard
          key={credential._id}
          credential={credential}
          onDeleteClick={handleDeleteClick}
        />
      ))}
      <Link to="/credential/add">
        <AddButton status={displayButton} />
      </Link>
    </main>
  );
}
