import Hapi from 'hapi';
import logger from './utils/logger';

import getReference from './actions/getReference';

const server = Hapi.server({
  host: 'localhost',
  port: 3002,
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
