const nodemailer = require('nodemailer');

const mail = (username, content, clubMail) => {
    let transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: "future.visions.tech@outlook.com",
            pass: "FutureVisions2021"
        }
    })

    let details = {
        from: "future.visions.tech@outlook.com",
        to: clubMail,
        subject: `Message from ${username} via Uni-Social `,
        text: content
    }

    transporter.sendMail(details, (err) => {
        if (err) {
            console.error("Error occured");
            console.error(err);
        }
        else {
            console.log("Email sent successfully");
        }
    })
}

module.exports = mail;