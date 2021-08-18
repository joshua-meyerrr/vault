import React from 'react';
import styles from './dashboard.module.css';

export default function Dashboard(): JSX.Element {
  return (
    <>
      <h1 className={styles.header}>Vault 🕋</h1>
      <input className={styles.input} type="text" />
      <p className={styles.yourPasswords}>Your passwords:</p>
    </>
  );
}
