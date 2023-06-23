const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError} = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const { User } = require("../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  })
};

module.exports = {
    register: ctrlWrapper(register),
}