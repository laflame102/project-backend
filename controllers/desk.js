const { Desk } = require('../models/task');

const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');

const getAllDesk = async (req, res) => {
  const result = await Desk.find();
  res.json(result);
};

const getDeskById = async (req, res) => {
  const { deskId } = req.params;
  const result = await Desk.findById(deskId);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addDesk = async (req, res) => {
  const result = await Desk.create(req.body);
  res.status(201).json(result);
};

const deleteDesk = async (req, res) => {
  const { deskId } = req.params;
  const result = await Desk.findByIdAndRemove(deskId);

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: 'desk deleted' });
};

const updateDesk = async (req, res) => {
  const { deskId } = req.params;
  const result = await Desk.findByIdAndUpdate(deskId, req.body, {
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
  getAllDesk: ctrlWrapper(getAllDesk),
  getDeskById: ctrlWrapper(getDeskById),
  deleteDesk: ctrlWrapper(deleteDesk),
  updateDesk: ctrlWrapper(updateDesk),
  addDesk: ctrlWrapper(addDesk),
  // updateFavorite: ctrlWrapper(updateFavorite),
};
