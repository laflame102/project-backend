const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    HttpError(400, `${taskId} is not valid id`);
  }

  next();
};

module.exports = isValidId;
