const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 465,
    auth: {
        user: "smtp_username",
        pass: "smtp_password"
    }
})


const sendEmail = (email, subject_, message_) => {
    var message = {
        from: "sender_email",
        to: email,
        subject: subject_,
        html: message_
    }

    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info);
            transporter.close();
        }
    });
}

// sendEmail();
// transporter.sendEmail("asdasd");

module.exports = {
    sendEmail
};
