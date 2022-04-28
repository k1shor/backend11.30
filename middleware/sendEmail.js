const nodemailer = require('nodemailer')

exports.sendEmail = (options) =>{
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER, 
          pass: process.env.SMTP_PASS, 
        },
      });

      const mailOptions = {
        from: options.from, // sender address
        to: options.to, // list of receivers
        subject: options.subject, // Subject line
        text: options.text, // plain text body
        html: options.html, // html body
      }

      transporter.sendMail(mailOptions);
}