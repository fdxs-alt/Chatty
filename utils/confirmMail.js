const nodemailer = require("nodemailer");

exports.sendEmail = async (jwt, email) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const url = process.env.baseUrl + `/confirm?token=${jwt}`;

    await transporter.sendMail({
      from: `"My site" ${process.env.email}`, // sender address
      to: email,
      subject: "Confirm email",
      html: `Please click this email to confirm your password: <a href= "${url}">Activate your account now</a> `, // html body
    });
  } catch (error) {}
};
