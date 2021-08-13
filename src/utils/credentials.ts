import type { Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import {
  createListing,
  deleteListingByName,
  findListingByName,
  getAllListings,
  updateListing,
} from './database';
import dotenv from 'dotenv';
dotenv.config();

export async function readCredentials(): Promise<Credential[]> {
  return await getAllListings();
}

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credential = await findListingByName(service);
  if (!credential) {
    throw new Error(`There is no entry associated to ${service}`);
  }
  const decryptedCredential = decryptCredential(credential, key);
  return decryptedCredential;
}

export async function addCredential(
  credential: Credential,
  key: string
): Promise<void> {
  const encryptedCredential = encryptCredential(credential, key);

  if (!process.env.MONGODB_URL) {
    throw new Error('No MONGODB_URL dotenv variable');
  }

  await createListing(encryptedCredential);
}

export async function deleteCredential(service: string): Promise<void> {
  await deleteListingByName(service);
}

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const encryptedCredential = encryptCredential(credential, key);
  await updateListing(service, encryptedCredential);
}
