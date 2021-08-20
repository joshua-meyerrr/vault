import React from 'react';
import styles from './AddButton.module.css';

type AddButtonProps = {
  status: boolean;
};

export default function AddButton({ status }: AddButtonProps): JSX.Element {
  if (status) {
    return <button className={styles.button}>+</button>;
  } else {
    return <></>;
  }
}
