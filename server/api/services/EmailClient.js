const nodemailer = require('nodemailer');

const gmailUser = process.env.GMAIL_USER;
const gmailPw = process.env.GMAIL_PW;
const adminsMail = process.env.ADMINS_MAIL;

function EmailClient(options) {  
    if (typeof options === "object") {
        const acceptedKeys = Object.keys(this.options);
        Object.keys(options).forEach((val) => {
            if (!acceptedKeys.includes(val)) return delete options[val];
            if (typeof this.options[val] !== typeof options[val]) {
                let errorMessage = `Mismatch type for option "${val}", ` +
                    `expected ${typeof this.options[val]}, received ${typeof options[val]}`;
                throw new TypeError(errorMessage);
            }
        });
        this.options = Object.assign(this.options, options);
    }
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailPw
        }
    });
}

EmailClient.prototype.options = {
    from: 'fatecjd_chatbot-no_reply@no_reply.com',
    to: adminsMail,
}

EmailClient.prototype.send = function (emailSubject, emailBody) {
    if (!emailSubject || typeof emailSubject !== 'string')
        throw new Error(`Wrong type for parameter 'subject'. Received ` + typeof emailSubject +
            `Expected string.`);
    if (!emailBody || typeof emailBody !== 'string')
        throw new Error(`Wrong type for parameter 'body'. Received ` + typeof emailBody +
            `Expected string.`);
    this.options.subject = emailSubject;
    this.options.html = emailBody;
    return new Promise((res, rej) => {
        this.transporter.sendMail(this.options, (err, body) => {
            if (err) return rej(err);
            return res(body);
        });
    });
}

module.exports = EmailClient;
