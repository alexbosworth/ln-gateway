const config = require('dotenv').config();
const {grpcProxyServer} = require('ln-service/routers');

const getTlsCredentials = require('./get_tls_credentials');

const {log} = console;
const path = '/';
const port = 8080;

const {app, server, wss} = grpcProxyServer({
  log,
  path,
  port,
  cert: process.env.LND_TLS_CERT,
  socket: process.env.LND_GRPC_SOCKET,
  tls: getTlsCredentials({env: process.env}).tls,
});
