import Koa from 'koa';
import koaBody from 'koa-body';
import cors from '@koa/cors';

import serve from 'koa-static';
import { koaSwagger } from 'koa2-swagger-ui';
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
app.use(serve('public'));
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
      url: '/swagger.yml',
    },
  }),
);

export const server = app.listen(config.port);

console.log(`Server running on port ${config.port}`);
