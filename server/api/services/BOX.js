const BoxSDK = require('box-node-sdk');

function BOX() {
    var sdk = new BoxSDK({
        clientID: process.env.BOX_CLIENT_ID,
        clientSecret: process.env.BOX_CLIENT_SECRET,
        appAuth: {
            keyID: process.env.BOX_PUBLIC_KEY_ID,
            privateKey: process.env.BOX_PRIVATE_KEY,
            passphrase: process.env.BOX_PASSPHRASE
        }
    });
    this._client = sdk.getAppAuthClient('enterprise', process.env.BOX_ENTERPRISE_ID);
}

BOX.prototype.getPublicLink = function (id) {
    if (typeof id !== 'number')
        throw Error("getPublicLink id parameter must be a number, " +
            `${typeof id} received.`);
    return new Promise((res, rej) => {
        this._client.files.getEmbedLink(id)
            .then(embedURL => { return res(embedURL) })
            .catch(err => { return rej(err) })
    })

}

module.exports = BOX;