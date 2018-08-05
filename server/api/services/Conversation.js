const ConversationV1 = require('watson-developer-cloud/conversation/v1');

const wcsUser = process.env.WATSON_CONVERSATION_USERNAME;
const wcsPw = process.env.WATSON_CONVERSATION_PASSWORD;
const wcsWorkspaceId = process.env.WATSON_CONVERSATION_WORKSPACE_ID;
const wcsVersionDate = process.env.WATSON_CONVERSATION_VERSION_DATE;

function Conversation() {
  this._workspaceId = wcsWorkspaceId;
  this._conversation = new ConversationV1({
    username: wcsUser,
    password: wcsPw,
    version_date: wcsVersionDate
  });
}

Conversation.prototype.sendMessage = function(inputMsg) {
  if (typeof inputMsg !== 'string')
    throw new Error("sendMessage() input parameter must be a string, " +
      `${typeof inputMsg} received.`);
  return new Promise((res, rej) => {
    this._conversation.message({
      input: { text: inputMsg },
      workspace_id: this._workspaceId,
    }, function (err, response) {
      if (err) return rej(err);
      return res(response)
    });
  })
}

module.exports = Conversation;