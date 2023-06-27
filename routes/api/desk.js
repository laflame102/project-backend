const express = require('express');

const deskController = require('../../controllers/desk');

const deskRouter = express.Router();

const { schemas } = require('../../models/task');

const { validateBody, authenticate, isValidId } = require('../../decorators');

deskRouter.get('/', authenticate, deskController.getAllDesk);

deskRouter.get('/:deskId', authenticate, isValidId, deskController.getDeskById);

deskRouter.post('/', authenticate, validateBody(schemas.deskSchemaJoi), deskController.addDesk);

deskRouter.patch(
  '/:deskId',
  isValidId,
  authenticate,
  validateBody(schemas.deskSchemaJoi),
  deskController.updateDesk
);

deskRouter.patch(
  '/:deskId/background',
  isValidId,
  authenticate,
  validateBody(schemas.updateDeskBGSchemaJoi),
  deskController.updateDesk
);

deskRouter.delete('/:deskId', authenticate, isValidId, deskController.deleteDesk);

module.exports = deskRouter;
