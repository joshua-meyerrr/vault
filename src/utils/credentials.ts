import { readFile } from 'fs/promises';
import type { DB, Credential } from '../types';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf8');
  const db: DB = JSON.parse(response);
  return db.credentials;
}

export async function getCredential(service: string): Promise<Credential> {
  const credentials = await readCredentials();
  const serviceCredential = credentials.find(
    (credential) => credential.service === service
  );

  if (!serviceCredential) {
    throw new Error(`No credential found for service: ${service}`);
  }
  return serviceCredential;
}
