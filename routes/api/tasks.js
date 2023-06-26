const express = require("express");

const tasksController = require("../../controllers/tasks");

const taskRouter = express.Router();

const { schemas } = require("../../models/task");

const { validateBody, isValidId } = require("../../decorators");

taskRouter.get("/", tasksController.getAllTasks);

taskRouter.get("/:taskId", isValidId, tasksController.getTaskById);

taskRouter.post(
  "/",
  validateBody(schemas.taskSchemaJoi),
  tasksController.addTask
);

taskRouter.patch(
  "/:taskId",
  isValidId,
  validateBody(schemas.updateTaskSchemaJoi),
  tasksController.updateTask
);

taskRouter.delete("/:taskId", isValidId, tasksController.deleteTask);

module.exports = taskRouter;
