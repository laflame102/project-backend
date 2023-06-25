const { HttpError } = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, `missing fields`));
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        const errorMessage = `missing required ${error.details[0].path} field`;
        next(HttpError(400, errorMessage));
      }
      next();
    }
  };

  return func;
};

module.exports = validateBody;
