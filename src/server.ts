import { getCredential, readCredentials } from './utils/credentials';
import express, { request } from 'express';

const app = express();
const port = 3000;

app.get('/api/credentials/:service', async (request, response) => {
  const { service } = request.params;
  try {
    const credential = await getCredential(service);
    response.status(200).json(credential);
  } catch (error) {
    console.error(error);
    response.status(404).send(`Could not find service: ${service}.`);
  }
});

app.get('/api/credentials', async (_request, response) => {
  try {
    const credentials = await readCredentials();
    response.status(200).json(credentials);
  } catch (error) {
    console.error;
    response.status(500).send(`Internal Sever Error! Please try again later`);
  }
});

app.get('/', (_requests, response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
