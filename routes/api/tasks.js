const express = require('express');

const tasksController = require('../../controllers/tasks');

const taskRouter = express.Router();

const { schemas } = require('../../models/task');

const { validateBody, authenticate, isValidId } = require('../../decorators');

taskRouter.get('/', authenticate, tasksController.getAllTasks);

taskRouter.get('/:taskId', authenticate, isValidId, tasksController.getTaskById);

taskRouter.post('/', authenticate, validateBody(schemas.taskSchemaJoi), tasksController.addTask);

taskRouter.patch(
  '/:taskId',
  isValidId,
  authenticate,
  validateBody(schemas.updateTaskSchemaJoi),
  tasksController.updateTask
);

taskRouter.delete('/:taskId', authenticate, isValidId, tasksController.deleteTask);

module.exports = taskRouter;
