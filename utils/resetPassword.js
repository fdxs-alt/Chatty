const nodemailer = require("nodemailer");

exports.resetPassword = async (jwt, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const url = process.env.baseUrl + `/reset?token=${jwt}`;

    await transporter.sendMail({
      from: `"My site" ${process.env.email}`,
      to: email,
      subject: "Reset password",
      html: `Please click this email to reset your password: <a href= "${url}">Reset</a> `, // html body
    });

    console.log(`message sent to ${email}`);
  } catch (error) {
    console.log(error);
  }
};
