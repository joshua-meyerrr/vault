import React from 'react';
import styles from './dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Vault 🕋</h1>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter service..."
      />
      <p className={styles.yourPasswords}>Your passwords:</p>
    </main>
  );
}
