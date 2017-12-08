import winston from 'winston';
import 'winston-loggly-bulk';

winston.add(winston.transports.Loggly, {
  token: process.env.LOGGLY_TOKEN,
  subdomain: 'emaincourt',
  tags: ['findmyrecords'],
  json: true,
  level: 'info',
});

export default winston;
