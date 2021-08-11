import { readFile, writeFile } from 'fs/promises';
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

export async function addCredential(credential: Credential): Promise<void> {
  const credentials = await readCredentials();
  const updatedCredentials = [...credentials, credential];
  updateDB(updatedCredentials);
}

export async function deleteCredential(service: string): Promise<void> {
  const credentials = await readCredentials();
  const updatedCredentials = credentials.filter(
    (credential) => credential.service !== service
  );

  // if (updatedCredentials.length === credentials.length) {
  //   throw new Error('hflskdfs');
  // }
  updateDB(updatedCredentials);
}

export async function updateDB(
  updatedCredentials: Credential[]
): Promise<void> {
  const database: DB = {
    credentials: [],
  };
  database.credentials = updatedCredentials;
  await writeFile('src/db.json', JSON.stringify(database, null, 2));
}
