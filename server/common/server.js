import dotenv from 'dotenv';
import * as path from 'path';
import express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import Logger, {configure} from 'bunyan-node-logger';
import morgan from 'morgan';
dotenv.config();
configure({
  appId: process.env.APP_ID,
  level: process.env.LOG_LEVEL
});


/*------------- Setting up the Server --------------*/
const app = new express();
export default class ExpressServer {
  constructor() {
    this._l = new Logger(this.constructor.name);
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(root + '/client/build'));
  }

  router(routes) {
    routes(app);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = (port, msg) => () => this._l.info(msg,
      `up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname() } on port: ${port}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
