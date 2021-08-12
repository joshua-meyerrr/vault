import CryptoJS from 'crypto-js';
import type { Credential } from '../types';

export function encryptCredential(credential: Credential): Credential {
  const encryptedPassword = CryptoJS.TripleDES.encrypt(
    credential.password,
    'lmao'
  ).toString();

  const encryptedCredential = {
    ...credential,
    password: encryptedPassword,
  };

  return encryptedCredential;
}
