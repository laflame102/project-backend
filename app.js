const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/users');
const deskRouter = require('./routes/api/desk');
const columnRouter = require('./routes/api/column');
const tasksRouter = require('./routes/api/tasks');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);
app.use('/api/desk', deskRouter);
app.use('/api/desk/:columnId', columnRouter);
app.use('/api/desk/:columnId/:taskId', tasksRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
