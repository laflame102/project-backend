const express = require('express');

const columnController = require('../../controllers/column');

const columnRouter = express.Router();

const { schemas } = require('../../models/task');

const { validateBody, isValidId } = require('../../decorators');

columnRouter.get('/', columnController.getAllColumn);

columnRouter.get('/:columnId', isValidId, columnController.getColumnById);

columnRouter.post('/', validateBody(schemas.columnSchemaJoi), columnController.addColumn);

columnRouter.put(
  '/:columnId',
  isValidId,
  validateBody(schemas.columnSchemaJoi),
  columnController.updateColumn
);

// router.patch(
//   '/:taskId/favorite',
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   tasksController.updateContact
// );

columnRouter.delete('/:columnId', isValidId, columnController.deleteColumn);

module.exports = columnRouter;
