import { readFile } from 'fs/promises';
import CryptoJS from 'crypto-js';

export async function validateMasterpassword(
  password: string
): Promise<boolean> {
  // read hashedMasterpassword from .password
  const hashedMasterpassword = await readFile('.password', 'utf8');
  // hash enteredPassword
  const hashedPassword = CryptoJS.SHA256(password).toString();

  //compare hashed masterpassword with enteredPassword
  //return outcome
  return hashedMasterpassword === hashedPassword;
}
