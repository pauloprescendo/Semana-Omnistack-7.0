const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  'mongodb+srv://dbUser:dbUser@cluster0-epyzo.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  },
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.disable('X-Powered-By');

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
);

app.use(require('./routes'));

server.listen(3333);
