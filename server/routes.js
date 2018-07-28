import conversationRouter from './api/controllers/conversation/router';
import feedbackRouter from './api/controllers/feedback/router';

const root = '/api/v1';
export default function routes(app) {
  app.use(`${root}/feedback`, feedbackRouter);
  app.use(`${root}/watson/conversation`, conversationRouter);
};
