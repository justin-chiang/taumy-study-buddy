const nodemailer = require("nodemailer");
const emailjs = require("emailjs-com")

const authEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.EMAIL_HOST,
            // port: process.env.EMAIL_PORT,
            // secure: true,
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("auth email sent");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = authEmail;