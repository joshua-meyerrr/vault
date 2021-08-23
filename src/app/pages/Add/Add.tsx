import React, { useState } from 'react';
import styles from './Add.module.css';
import { useHistory } from 'react-router-dom';

export default function Add(): JSX.Element {
  const [serviceValue, setServiceValue] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [masterPasswordValue, setMasterPasswordValue] = useState('');
  const history = useHistory();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newEntry = {
      service: serviceValue,
      username: usernameValue,
      password: passwordValue,
    };

    await fetch('/api/credentials', {
      method: 'POST',
      headers: {
        Authorization: masterPasswordValue,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    history.push('/');
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>New Entry</h1>
      <form
        className={styles.form}
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label className={styles.form__heading}>
          Service:
          <input
            type="text"
            value={serviceValue}
            onChange={(event) => setServiceValue(event.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.form__heading}>
          Username:
          <input
            className={styles.input}
            type="text"
            value={usernameValue}
            onChange={(event) => setUsernameValue(event.target.value)}
          />
        </label>
        <label className={styles.form__heading}>
          Password:
          <input
            type="password"
            className={styles.input}
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
          />
        </label>
        <label className={styles.form__heading}>
          Masterpassword:
          <input
            type="password"
            className={styles.input}
            value={masterPasswordValue}
            onChange={(event) => setMasterPasswordValue(event.target.value)}
          />
        </label>
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
    </main>
  );
}
