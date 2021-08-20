import React from 'react';
import type { Credential } from '../../../types';

type CredentialProps = {
  credential: Credential;
};

export default function CredentialCard({
  credential,
}: CredentialProps): JSX.Element {
  return (
    <div>
      <p>{credential.service}</p>
      <p>{credential.username}</p>
      <p>{credential.password}</p>
    </div>
  );
}
