import Router from 'koa-router';
import electionsRouter from './elections/router';

const baseRouter = new Router();

// Use Elections
baseRouter.use(electionsRouter.routes(), electionsRouter.allowedMethods());

// Basic healthcheck
baseRouter.get('/', async (ctx) => { ctx.body = 'OK'; });

export default baseRouter.routes();
