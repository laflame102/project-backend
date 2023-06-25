const { Schema, model } = require('mongoose');
const Joi = require('joi').extend(require('@joi/date'));
const { handleMongooseError } = require('../helpers');

const deskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ownerUser: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

deskSchema.post('save', handleMongooseError);

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ownerUser: {
      type: String,
      required: true,
    },
    ownerDesk: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post('save', handleMongooseError);

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ownerUser: {
      type: String,
      required: true,
    },
    ownerDesk: {
      type: String,
      required: true,
    },
    ownerColumn: {
      type: String,
      required: true,
    },
    taskValue: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['without priority', 'low', 'medium', 'high'],
      default: 'without priority',
    },
    deadline: {
      type: Date,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post('save', handleMongooseError);

const deskSchemaJoi = Joi.object({
  title: Joi.string().required(),
  ownerUser: Joi.string().required(),
});

const columnSchemaJoi = Joi.object({
  title: Joi.string().required(),
  ownerUser: Joi.string().required(),
  ownerDesk: Joi.string().required(),
});

const updateColumnSchemaJoi = Joi.object({
  title: Joi.string().required(),
});

const taskSchemaJoi = Joi.object({
  title: Joi.string().required(),
  ownerUser: Joi.string().required(),
  ownerDesk: Joi.string().required(),
  ownerColumn: Joi.string().required(),
  taskValue: Joi.string(),
  priority: Joi.string().default('Without priority'),
  deadline: Joi.date().format('DD-MM-YYYY'),
});

const updateTaskSchemaJoi = Joi.object({
  title: Joi.string(),
  taskValue: Joi.string(),
  priority: Joi.string(),
  deadline: Joi.date().format('DD-MM-YYYY'),
});

const schemas = {
  deskSchemaJoi,
  columnSchemaJoi,
  updateColumnSchemaJoi,
  taskSchemaJoi,
  updateTaskSchemaJoi,
};

const Desk = model('desk', deskSchema);
const Column = model('column', columnSchema);
const Task = model('task', taskSchema);

module.exports = { Task, Column, Desk, schemas };
