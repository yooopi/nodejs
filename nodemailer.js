const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var smtpTransport = nodemailer.createTransport(
  smtpTransport({
    service: "Yandex",
    host: "smtp.yandex.ru",
    auth: {
      user: `test@test.com`,
      pass: `test123`,
    },
  })
);

const mailOptions = {
  from: "Vasak <vasak777@ya.ru>",
  to: "yooopiav@gmail.com",
  subject: "Hello!",
  text: "yooooo!",
  html: "<h5>yooooo, dude! test mail from node.js</h5>",
};

smtpTransport.sendMail(mailOptions, (err, res) => {
  err ? console.log(`Error: ${err}`) : console.log(`Email sent: ${res}`);
});
