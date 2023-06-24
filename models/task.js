const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const deskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // favorite: {
  //   type: Boolean,
  //   default: false,
  // },
});

deskSchema.post('save', handleMongooseError);

const columnSchema = new Schema({
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
});

columnSchema.post('save', handleMongooseError);

const taskSchema = new Schema({
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
  },
  favorite: {
    type: String,
    default: 'Without priority',
  },
  deadline: {
    type: Date,
  },
});

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
  deadline: Joi.date(),
});

const updateTaskSchemaJoi = Joi.object({
  title: Joi.string().required(),
  taskValue: Joi.string(),
  priority: Joi.string().default('Without priority'),
  deadline: Joi.date(),
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
