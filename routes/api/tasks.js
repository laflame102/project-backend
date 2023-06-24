const express = require('express');

const tasksController = require('../../controllers/tasks');

const taskRouter = express.Router();

const { schemas } = require('../../models/task');

const { validateBody, isValidId } = require('../../decorators');

taskRouter.get('/', tasksController.getAllTasks);

taskRouter.get('/:taskId', isValidId, tasksController.getTaskById);

taskRouter.post('/', validateBody(schemas.taskSchemaJoi), tasksController.addTask);

taskRouter.put(
  '/:taskId',
  isValidId,
  validateBody(schemas.taskSchemaJoi),
  tasksController.updateTask
);

// router.patch(
//   "/:taskId/favorite",
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   tasksController.updateContact
// );

taskRouter.delete('/:taskId', isValidId, tasksController.deleteTask);

module.exports = taskRouter;
