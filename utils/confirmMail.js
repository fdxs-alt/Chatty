const nodemailer = require("nodemailer");

exports.sendEmail = async (jwt, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const url = process.env.baseUrl + `/confirm?token=${jwt}`;

    await transporter.sendMail({
      from: `"My site" ${process.env.email}`, // sender address
      to: email,
      subject: "Confirm email",
      html: `Please click this email to confirm your password: <a href= "${url}">Activate your account now</a> `, // html body
    });
  } catch (error) {
    console.log(error);
  }
};
