import Hapi from 'hapi';
import logger from './utils/logger';

import getReference from './utils/getReference';

const server = Hapi.server({
  host: 'localhost',
  port: 3001,
});

server.route(getReference);

async function start() {
  try {
    await server.start();
  } catch (err) {
    process.exit(1);
  }
  logger.info('Server Juno running at:', server.info.uri);
}

start();
