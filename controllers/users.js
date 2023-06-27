const { User } = require("../models/user");
const { HttpError, sendEmail } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env; 


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPassword = await bcrypt.hash(password, 10);;

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
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  }

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(201).json({
    accessToken,
    refreshToken,
  })
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw HttpError(403, 'invalid token')
    }
    const payload = {
      id,
    };
  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

const getCurrent = async (req, res) => {
  const { name, email, avatarURL, theme } = req.user;

  console.log("req.user -->", req.user.id);

  res.status(200).json({
    name,
    email,
    avatarURL,
    theme,
  });
};

const theme = async (req, res) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    theme: result.theme,
  });
};

const help = async (req, res) => {
  const { email, comment } = req.body;

  const helpEmail = {
    to: email,
    subject: "Help with TaskPro",
    html: `<h5>Our specialist will contact you soon.</h5> <h6>We have received your message for help with the TaskPro:</h6> <p>${comment}</p>`,
  };

  await sendEmail(helpEmail);

  res.status(200).json({
    message: "Email has been send successfully",
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
  theme: ctrlWrapper(theme),
  help: ctrlWrapper(help),
};
