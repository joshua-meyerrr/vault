import { MongoClient, Collection } from 'mongodb';
import { Credential } from '../types';

let client: MongoClient;

export async function connectDatabase(url: string): Promise<void> {
  client = new MongoClient(url);
  await client.connect();
}

export function getCollection<T>(name: string): Collection<T> {
  return client.db().collection<T>(name);
}

export function getCredentialCollection(): Collection<Credential> {
  return getCollection<Credential>('credentials');
}

// List Operations

export async function createListing(credential: Credential): Promise<void> {
  const credentialCollection = getCredentialCollection();
  credentialCollection.insertOne(credential);
}

export async function findListingByName(
  name: string
): Promise<Credential | undefined> {
  const credentialCollection = getCredentialCollection();
  const targetCredential = await credentialCollection.findOne({
    service: name,
  });
  return targetCredential;
}

export async function deleteListingByName(name: string): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.deleteOne({ service: name });
}

export async function getAllListings(): Promise<Credential[]> {
  const credentialCollection = getCredentialCollection();
  const collection = await credentialCollection.find({}).toArray();
  return collection;
}

export async function updateListing(
  name: string,
  credential: Credential
): Promise<void> {
  const credentialCollection = getCredentialCollection();
  await credentialCollection.replaceOne({ service: name }, credential);
}
