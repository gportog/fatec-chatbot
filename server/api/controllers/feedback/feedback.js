const DBClient = require('../../services/DBClient');
const EmailClient = require('../../services/EmailClient');

module.exports = (req, res, next) => {
    if (!req.body.evaluation || typeof req.body.evaluation !== 'string') {
        let err = new Error(`Received ` + typeof req.body.evaluation + ` for field 'evaluation'. ` +
            `Expected a string.`);
        err.status = 400;
        return next(err)
    }
    if (typeof req.body.comment !== 'string' && typeof req.body.comment !== 'undefined') {
        let err = new Error(`Received ` + typeof req.body.comment + ` for field 'comment'. ` +
            `Expected a string.`);
        err.status = 400;
        return next(err)
    }
    const dbInstance = new DBClient('chatbot_feedback');
    const emailClient = new EmailClient();
    const date = new Date();
    let feedbackEntry = {
        user: req.session ? req.session.user.name : 'username',
        contact: req.session ? req.session.user.contact : 'contato',
        history: req.body.history || [],
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        comment: req.body.comment,
        evaluation: req.body.evaluation
    }
    let emailMessage = "<body>" +
        "<div>" +
        "<h3>FATEC-JD Chatbot</h3>" +
        `<p>Você recebeu um feedback ${feedbackEntry.evaluation} do/a ${feedbackEntry.contact}</p>` +
        `<p><b>Mensagem: </b>${feedbackEntry.comment}</p>` +
        `<p>Para mais informações, acesse o <a href="https://fatec-chabot-dev.mybluemix.net/#/" target="blank">Admin Dashboard</a>.</p>` +
        "</div>" +
        "</body>";
    emailClient.send(`Você recebeu um feedback do/a ${feedbackEntry.user}`, emailMessage)
        .then(() => dbInstance.insert(feedbackEntry))
        .then((resp) => {
            return res.status(200).json(resp);
        })
        .catch((error) => {
            let err = new Error('Internal server error');
            return next(err)
        });
}
