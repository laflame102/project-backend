const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");

const { User } = require("../models/user");
const { HttpError, sendEmail, cloudinary } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

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
  };

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "23h",
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(201).json({
    accessToken,
    refreshToken,
  });
};

const refresh = async (req, res) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY);
    const isExist = await User.findOne({ refreshToken: token });
    if (!isExist) {
      throw HttpError(403, "invalid token");
    }
    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "23h",
    });
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

const updateProfile = async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.findByIdAndUpdate(id, { ...req.body, password: hashPassword }, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    name: result.name,
    email: result.email,
  })
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { accessToken: "" });

  res.status(204).end();
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

const updateAvatar = async (req, res) => {
  const { path: oldPath } = req.file;
  console.log(oldPath);
  const fileData = await cloudinary.uploader.upload(oldPath, {
    folder: "avatars",
  });

  console.log(fileData);

  await fs.unlink(oldPath);
  const { _id: owner } = req.user;
  const result = await User.findByIdAndUpdate(
    owner,
    { ...req.body, avatarURL: fileData.url },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, `User with id=${owner} not found`);
  }

  res.json(result.avatarURL);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
  updateProfile: ctrlWrapper(updateProfile),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  theme: ctrlWrapper(theme),
  help: ctrlWrapper(help),
};
