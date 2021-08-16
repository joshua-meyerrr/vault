import type { Credential } from '../types';
import { decryptCredential, encryptCredential } from './crypto';
import { getCredentialCollection } from './database';
import dotenv from 'dotenv';
dotenv.config();

export async function readCredentials(key: string): Promise<Credential[]> {
  const credentialCollection = getCredentialCollection();
  const collection = await credentialCollection.find({}).toArray();
  const decryptedCredential = collection.map((credential) =>
    decryptCredential(credential, key)
  );
  return decryptedCredential;
}

export async function getCredential(
  service: string,
  key: string
): Promise<Credential> {
  const credentialCollection = getCredentialCollection();
  const credential = await credentialCollection.findOne({
    service,
  });
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

  const credentialCollection = getCredentialCollection();
  await credentialCollection.insertOne(encryptedCredential);
}

export async function deleteCredential(service: string): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.deleteOne({ service });
}

export async function updateCredential(
  service: string,
  credential: Credential,
  key: string
): Promise<void> {
  const encryptedCredential = encryptCredential(credential, key);
  const credentialCollection = getCredentialCollection();
  await credentialCollection.replaceOne({ service }, encryptedCredential);
}
