#!/usr/bin/env node

/**
 * Module dependencies.
 */

import 'dotenv/config';
import app from './app';
import http from 'http';

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string): number | string | false => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: any): never => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = (): void => {
  const addr = server.address();

  if (!addr) {
    return;
  }

  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.log('Listening on ' + bind);
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
app.set('hostname', '0.0.0.0');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen({ port: port, hostname: '0.0.0.0' });
server.on('error', onError);
server.on('listening', onListening);
