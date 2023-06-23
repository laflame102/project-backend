const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const theme = async (req, res) => {
    const { id } = req.user;
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.json({
        theme: result.theme,
    })
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
        message: "Email has been send successfully"
    })
};

module.exports = {
  theme: ctrlWrapper(theme),
  help: ctrlWrapper(help),
}