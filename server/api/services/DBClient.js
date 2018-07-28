const Cloudant = require('@cloudant/cloudant');

const user = process.env.CLOUDANT_USER;
const pw = process.env.CLOUDANT_PW;

function DBClient(db) {
    if (db && typeof db !== 'string')
        throw new Error("DBClient db parameter must be of type string, " +
            `${typeof db} received.`);
    this._db = db || null;
    this._client = Cloudant({ account: user, password: pw });
}

DBClient.prototype.insert = function (doc, options) {
    if (!doc || typeof doc !== 'object')
        throw new Error(`'doc' parameter must be a valid object ` +
            `${typeof doc} received.`);
    validateDB(this, options)
    const db = this._db || options.db;
    return new Promise((res, rej) => {
        const database = this._client.db.use(db);
        database.insert(doc, (err, body, header) => {
            if (err) return rej(err);
            if (body.ok) {
                doc._id = body.id;
                doc._rev = body.rev;
                return res(doc);
            } else return rej(body);
        });
    });
}

module.exports = DBClient;

function validateDB(instance, options) {
    if (!instance._db) {
        if (!(options && options.db))
            throw new Error('This client has no default databaset set, and one was not provided.');
        if (typeof options.db !== 'string')
            throw new Error(`Wrong type for parameter 'db'. Received ` + typeof options.db
                + `, expected 'string`);
    }
}
