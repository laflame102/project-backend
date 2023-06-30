const express = require('express');

const columnController = require('../../controllers/column');

const columnRouter = express.Router();

const { schemas } = require('../../models/task');

const { validateBody, authenticate, isValidId } = require('../../decorators');

columnRouter.get('/', authenticate, columnController.getAllColumn);

columnRouter.get('/:columnId', authenticate, isValidId, columnController.getColumnById);

columnRouter.post(
  '/',
  authenticate,
  validateBody(schemas.columnSchemaJoi),
  columnController.addColumn
);

columnRouter.patch(
  '/:columnId',
  isValidId,
  authenticate,
  validateBody(schemas.updateColumnSchemaJoi),
  columnController.updateColumn
);

columnRouter.delete('/:columnId', isValidId, columnController.deleteColumn);

module.exports = columnRouter;
