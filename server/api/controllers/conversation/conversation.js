const Conversation = require('../../services/Conversation');
const DBClient = require('../../services/DBClient');
const BOX = require('../../services/BOX');

module.exports = (req, res, next) => {
    const conversationInstance = new Conversation();
    let wdsAnswer;
    conversationInstance.sendMessage(req.body.input)
        .then((resp) => {
            wdsAnswer = resp;
            const dbInstance = new DBClient('chatbot_answers');
            let clientIntent = wdsAnswer.intents;
            let clientEntities = wdsAnswer.entities;
            if (clientIntent.length > 0) clientIntent = clientIntent[0].intent;
            else clientIntent = '';
            if (clientEntities.length > 0)
                clientEntities.forEach((e) => {
                    delete e.location;
                    delete e.confidence;
                })
            return dbInstance.search({
                selector: {
                    intent: clientIntent,
                    entities: {
                        $all: clientEntities
                    }
                },
                fields: ['answer', 'file', 'entities']
            });
        })
        .then((dbResp) => {
            if (dbResp.length > 0) {
                let bestAnswer = dbResp[0];
                let entitiesLength = dbResp[0].entities.length;
                for (let i = 0; i < dbResp.length; i++) {
                    if (dbResp[i].entities.length < entitiesLength)
                        bestAnswer = dbResp[i];
                }
                if (bestAnswer.file) wdsAnswer.output.file = bestAnswer.file;
                wdsAnswer.output.text = [bestAnswer.answer];
                wdsAnswer.output.cardType = 'enriched';
            }
            if (!wdsAnswer.output.file) return res.status(200).json(wdsAnswer);
            const boxInstance = new BOX();
            boxInstance.getPublicLink(wdsAnswer.output.file)
                .then((boxResp) => {
                    wdsAnswer.output.file = boxResp;
                    console.log(JSON.stringify(wdsAnswer, null, 2));
                    return res.status(200).json(wdsAnswer);
                })
        })
        .catch((error) => {
            console.log(error.message);
            let err = new Error('Internal server error');
            return next(err)
        })
}