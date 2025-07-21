import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { ENV } from './config';

const app = express();
const env = ENV;

const main = () => {
  const reactAppPath = path.join(__dirname, '../..', 'web/dist');
  if (env.NODE_ENV === 'production') {
    if (fs.existsSync(reactAppPath)) {
      app.use(express.static(reactAppPath));
    } else {
      console.error(`unable to find react static build at ${reactAppPath}`);
    }
  }

  //TODO add paths

  app.listen(env.API_PORT, env.API_HOST, () => {
    console.log(`api listening on ${env.API_HOST}:${env.API_PORT}`);
  });
};

main();
