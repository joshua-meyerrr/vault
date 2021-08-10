import { getCredential, readCredentials } from './utils/credentials';
import express, { request } from 'express';

const app = express();
const port = 3000;

getCredential('Google');

app.get('/api/credentials', async (_request, response) => {
  const credentials = await readCredentials();
  response.status(200).json(credentials);
});

app.get('/', (_requests, response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
