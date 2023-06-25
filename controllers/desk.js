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
  console.log(result);
  if (!result) {
    throw HttpError(404, `Desk with id: ${deskId} not found`);
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
    throw HttpError(404, `Desk with id: ${deskId} not found`);
  }

  res.json({ message: 'desk deleted' });
};

const updateDesk = async (req, res) => {
  const { deskId } = req.params;
  const result = await Desk.findByIdAndUpdate(deskId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Desk with id: ${deskId} not found`);
  }

  res.json(result);
};

module.exports = {
  getAllDesk: ctrlWrapper(getAllDesk),
  getDeskById: ctrlWrapper(getDeskById),
  deleteDesk: ctrlWrapper(deleteDesk),
  updateDesk: ctrlWrapper(updateDesk),
  addDesk: ctrlWrapper(addDesk),
};
