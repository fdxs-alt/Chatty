const nodemailer = require("nodemailer");

exports.resetPassword = async (jwt, email) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "email-smtp.eu-central-1.amazonaws.com",
      port: 587,
      secure: true,
      auth: {
        user: testAccount.user,
        pass: testAccount.password,
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
