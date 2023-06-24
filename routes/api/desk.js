const express = require('express');

const deskController = require('../../controllers/desk');

const deskRouter = express.Router();

const { schemas } = require('../../models/task');

const { validateBody, isValidId } = require('../../decorators');

deskRouter.get('/', deskController.getAllDesk);

deskRouter.get('/:deskId', isValidId, deskController.getDeskById);

deskRouter.post('/', validateBody(schemas.deskSchemaJoi), deskController.addDesk);

deskRouter.put(
  '/:deskId',
  isValidId,
  validateBody(schemas.deskSchemaJoi),
  deskController.updateDesk
);

// router.patch(
//   '/:taskId/favorite',
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   tasksController.updateContact
// );

deskRouter.delete('/:deskId', isValidId, deskController.deleteDesk);

module.exports = deskRouter;
