import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { ENV } from './utils';

const app = express();
const env = ENV;

const main = async () => {
  app.get('/api', (_, res) => {
    res.send('api things');
  });

  // forward all non-api requests to the static file server for frontend
  const reactAppPath = path.join(__dirname, '../..', 'web/dist');
  if (env.NODE_ENV === 'production') {
    if (fs.existsSync(reactAppPath)) {
      app.use(express.static(reactAppPath));
      app.get('/{*any}', (req, res) => {
        // shouldn't reach this point
        if (req.path.startsWith('/api')) return res.sendStatus(404);
        res.sendFile(path.join(reactAppPath, 'index.html'));
      });
    } else {
      console.error(`unable to find react static build at ${reactAppPath}`);
    }
  }

  app.listen(env.API_PORT, () => {
    console.log(`API listening on port ${env.API_PORT}`);
  });
};

main();
