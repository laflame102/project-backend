const { Task } = require("../models/task");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getAllContacts = async (req, res) => {
  const result = await Task.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Task.findById(contactId);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Task.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Task.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Task.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Task.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  addContact: ctrlWrapper(addContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
