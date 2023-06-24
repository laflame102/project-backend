const { Column } = require('../models/task');

const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');

const getAllColumn = async (req, res) => {
  const result = await Column.find();
  res.json(result);
};

const getColumnById = async (req, res) => {
  const { columnId } = req.params;
  const result = await Column.findById(columnId);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addColumn = async (req, res) => {
  const result = await Column.create(req.body);
  res.status(201).json(result);
};

const deleteColumn = async (req, res) => {
  const { columnId } = req.params;
  const result = await Column.findByIdAndRemove(columnId);

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: 'Column deleted' });
};

const updateColumn = async (req, res) => {
  const { columnId } = req.params;
  const result = await Column.findByIdAndUpdate(columnId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

// const updateFavorite = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Task.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404);
//   }

//   res.json(result);
// };

module.exports = {
  getAllColumn: ctrlWrapper(getAllColumn),
  getColumnById: ctrlWrapper(getColumnById),
  deleteColumn: ctrlWrapper(deleteColumn),
  updateColumn: ctrlWrapper(updateColumn),
  addColumn: ctrlWrapper(addColumn),
  // updateFavorite: ctrlWrapper(updateFavorite),
};
