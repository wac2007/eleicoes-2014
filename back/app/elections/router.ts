import Router from 'koa-router';

import states from './routes/states';
import cities from './routes/cities';

const electionsRouter = new Router({
  prefix: '/api/eleicao/2014/presidente/primeiro-turno',
});

electionsRouter.get(
  '/estados',
  states,
);

electionsRouter.get(
  '/estados/:state/municipios',
  cities,
);

export default electionsRouter;
