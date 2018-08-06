import config from '../config';
import { apiGatewayRequest, COMMON_API_GATEWAY_HEADERS } from './helpers/fetch';

class ConversationService {
  message(text) {
    return new Promise((res, rej) => {
      const data = {
        input: text
      };
      fetch(`${config.apiRoot}/watson/conversation/message`, {
        method: 'POST',
        headers: COMMON_API_GATEWAY_HEADERS,
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok) return res(response.json());
          if (response.status === 403) throw new Error('Access forbidden');
          response = {
            output: {
              cardType: 'system_failure'
            }
          }
          return res(response);
        })
        .catch((error) => {
          console.error(error.message);
          rej(error);
        });
    })
  }
}

export default new ConversationService();
