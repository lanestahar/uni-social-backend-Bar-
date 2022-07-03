const {mail} = require('../utils/mail.js');

const contactMail = async (req, res, next) => {
    try {
        console.log('called!')
        mail(req.body.username, req.body.content, req.body.clubMail);//if ya da then ekle
        if(mail)
            res.json({message: 'Email is successfully sent'})
    } catch (error) {
        res.json(error(`Error while sending email ${error.message}`, 404));
    }
}

module.exports = { contactMail };