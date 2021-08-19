import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Destruction.module.css';

export default function Destruction(): JSX.Element {
  return (
    <main className={styles.container}>
      <p>10</p>
      <Link to="/">🚑 STOP!!!</Link>
    </main>
  );
}
