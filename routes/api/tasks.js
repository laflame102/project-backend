const express = require("express");

const tasksController = require("../../controllers/tasks");

const router = express.Router();

const { schemas } = require("../../models/task");

const { validateBody, isValidId } = require("../../decorators");

router.get("/", tasksController.getAllContacts);

router.get("/:taskId", isValidId, tasksController.getContactById);

router.post("/", validateBody(schemas.addSchema), tasksController.addContact);

router.put(
  "/:taskId",
  isValidId,
  validateBody(schemas.addSchema),
  tasksController.updateContact
);

router.patch(
  "/:taskId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  tasksController.updateContact
);

router.delete("/:taskId", isValidId, tasksController.deleteContact);

module.exports = router;
