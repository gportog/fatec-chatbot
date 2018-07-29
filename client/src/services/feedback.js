import config from '../config';
import { apiGatewayRequest, COMMON_API_GATEWAY_HEADERS } from './helpers/fetch';

class FeedbackService {
    sendFeedback(data) {
        return new Promise((res, rej) => {
            fetch(`${config.apiRoot}/feedback`, {
                method: 'POST',
                headers: COMMON_API_GATEWAY_HEADERS,
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.ok)
                        return res('Feedback enviado com sucesso.');
                    if (response.status === 403)
                        throw new Error('Access forbidden');
                    else
                        throw new Error('Falha ao realizar o request. ' +
                            'Por favor tente novamente mais tarde.');
                })
                .catch((error) => {
                    console.error(error.message);
                    rej(error);
                });
        })
    }
}

export default new FeedbackService();
