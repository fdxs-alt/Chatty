const nodemailer = require("nodemailer");

exports.sendEmail = async (jwt, email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password
      }
    });
    const url = process.env.baseUrl + `/confirm?token=${jwt}`;

    let info = await transporter.sendMail({
      from: `"My site" ${process.env.email}`, // sender address
      to: email,
      subject: "Confirm email",
      html: `Please click this email to conform your password: <a href= "${url}">Activate your account now</a> ` // html body
    });

    console.log(`message sent to ${email}`);
  } catch (error) {
    console.log(error);
  }
};
