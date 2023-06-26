const nodemailer = require("nodemailer");

const { META_EMAIL, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async ({ to, subject, html }) => {
  const email = {
    from: META_EMAIL,
    fromName: "TaskPro support team",
    to,
    subject,
    body: html,
  };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
