const nodemailer = require("nodemailer");

require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSKEY,
            },
        });

        const info = await transporter.sendMail({
            from: 'TalkTime',
            to: `${email}`,
            subject: `${title}`,
            text: "Please Confirm",
            html: `${body}`,
        });

        return info;
    }
    catch (error) {
        console.log("Mail sender is not working....");
        console.log(error);
    }

}

module.exports = mailSender;
