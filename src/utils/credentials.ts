import { readFile } from 'fs/promises';
import type { DB, Credential } from '../types';

export async function readCredentials(): Promise<Credential[]> {
  const response = await readFile('src/db.json', 'utf8');
  const db: DB = JSON.parse(response);
  return db.credentials;
}
