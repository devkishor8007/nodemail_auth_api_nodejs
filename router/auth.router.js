const express = require("express");
const AuthModel = require("../model/auth.model");
const router = express.Router();
const { transporter } = require("../nodemailer.transporter");
const { v4: uuidv4 } = require("uuid");

router.post("/login", async (req, res) => {
  const { email, password, token } = req.body;
  try {
    const token = req.query.token;

    const passwordCheck = await AuthModel.findOne({ password });
    const emailCheck = await AuthModel.findOne({ email });

    if (!emailCheck) {
      return res.status(400).send("Account not found");
    }

    if (!passwordCheck) {
      return res.status(400).send("Password is not matching");
    }

    if (token == emailCheck.token) {
      return res.status(200).json({ success: "true", emailCheck });
    } else {
      return res.send("Token is not matching");
    }
  } catch (e) {
    return res.json(e);
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const tokenData = uuidv4();
    const user = await AuthModel.create({
      name,
      email,
      password,
      token: tokenData,
    });

    const urlPathToLogin = `http://www.localhost:5000/api/v1/auth/login?token=${user.token}`;

    const mailData = {
      // use your email
      from: process.env.GMAIL_EMAIL,
      to: user.email,
      subject: `get your key ${user.name}`,
      text: `Token key is ${user.token}`,
      html: `<b>Hey there! </b> This is our first <br><a style="color:red" href=${urlPathToLogin}>Click to Login </a> </br><br> message sent with Nodemailer<br/> ${user.token}`,
    };

    console.log(user.token);
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log(error);
      }

      res.status(200).send({ message: "Mail send" });
    });

    return res.status(200).json({ success: "true", user });
  } catch (e) {
    return res.json(e);
  }
});

module.exports = router;
