import Hapi from 'hapi';
import logger from '@findmyrecords/logger';

import getReference from './actions/getReference';

const server = Hapi.server({
  host: '0.0.0.0',
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
