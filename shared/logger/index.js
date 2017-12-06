var winston = require('winston');
require('winston-loggly-bulk');
 
winston.add(winston.transports.Loggly, {
  token: process.env.LOGGLY_TOKEN,
  subdomain: 'emaincourt',
  tags: ['findmyrecords'],
  json: true,
  level: 'info',
});

module.exports = winston;