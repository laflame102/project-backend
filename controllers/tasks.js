const { Task } = require('../models/task');

const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');

const getAllTasks = async (req, res) => {
  const result = await Task.find();
  res.json(result);
};

const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findById(taskId);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addTask = async (req, res) => {
  const result = await Task.create(req.body);
  res.status(201).json(result);
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findByIdAndRemove(taskId);

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: 'task deleted' });
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findByIdAndUpdate(taskId, req.body, {
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
  getAllTasks: ctrlWrapper(getAllTasks),
  getTaskById: ctrlWrapper(getTaskById),
  deleteTask: ctrlWrapper(deleteTask),
  updateTask: ctrlWrapper(updateTask),
  addTask: ctrlWrapper(addTask),
  // updateFavorite: ctrlWrapper(updateFavorite),
};
