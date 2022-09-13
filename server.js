require('dotenv').config();
const express = require('express');
const server = express();
const client = require('./db/client');
const { PORT = 3000 } = process.env;
const morgan = require('morgan');
const appRouter = require('./api/index');
const cors = require('cors');

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
server.use('/', appRouter);

//server
client.connect();

server.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
