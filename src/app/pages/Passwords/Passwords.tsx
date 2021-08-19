import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Passwords.module.css';

export default function Password(): JSX.Element {
  const { service } = useParams<{ service: string }>();
  return (
    <main className={styles.container}>
      <p>This is the {service}</p>
    </main>
  );
}
