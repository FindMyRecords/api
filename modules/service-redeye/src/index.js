import Hapi from 'hapi';
import logger from '@findmyrecords/logger';

import getReference from './actions/getReference';

const server = Hapi.server({
  host: '0.0.0.0',
  port: 3002,
  cors: {
    origin: ['*'],
    additionalHeaders: ['token'],
  },
});

server.route(getReference);

async function start() {
  try {
    await server.start();
  } catch (err) {
    process.exit(1);
  }
  logger.info('Server Redeye running at:', server.info.uri);
}

start();
