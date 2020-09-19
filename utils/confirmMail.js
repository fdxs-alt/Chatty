const nodemailer = require("nodemailer");

exports.sendEmail = async (jwt, email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.eu-central-1.amazonaws.com",
      port: 587,
      secure: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.password,
      },
    });

    const url = process.env.baseUrl + `/confirm?token=${jwt}`;

    const info = await transporter.sendMail({
      from: `"My site" ${process.env.email}`, // sender address
      to: email,
      subject: "Confirm email",
      html: `Please click this email to confirm your password: <a href= "${url}">Activate your account now</a> `, // html body
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
};
