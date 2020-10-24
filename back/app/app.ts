import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';

import koaBunyanLogger from 'koa-bunyan-logger';
import logger from './logger';
import routes from './routes';
import { config } from './config';

const app = new Koa();

app.use(koaBody());
app.use(cors());
app.use(koaBunyanLogger(logger));
app.use(koaBunyanLogger.requestLogger());
app.use(koaBunyanLogger.timeContext());
app.use(routes);

export const server = app.listen(config.port);

console.log(`Server running on port ${config.port}`);
