#!/usr/bin/env node

/**
 * Module dependencies.
 */

  import http from 'http';
  import fs from 'fs';
  import app from '../app.js';

  /**
  * Normalize a port into a number, string, or false.
  */
  
  const normalizePort = (val) => {
  const port = parseInt(val, 10);
  
  if (Number.isNaN(port)) {
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
  * Get port from environment and store in Express.
  */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
  * Create HTTP server.
  */

const server = http.createServer(app);

/**
  * Event listener for HTTP server "error" event.
  */

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

   // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
  * Event listener for HTTP server "listening" event.
  */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  const dir = './uploads';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(`Listening on ${bind}`);
};

  // import db from './models/index.js';
  // db.sequelize
  //   .sync()  
  //   .then(() => {
  //     console.log('Synced db.');
  //   })
  //   .catch(err => {
  //     console.log(`Failed to sync db: ${  err.message}`);
  //   });
/**
  * Listen on provided port, on all network interfaces.
  */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);