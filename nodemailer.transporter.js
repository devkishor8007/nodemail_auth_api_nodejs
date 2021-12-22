require("dotenv").config();

const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    // use your email and password of gmail
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASS,
  },
  secure: true,
});
