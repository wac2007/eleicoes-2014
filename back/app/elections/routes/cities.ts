import { RouterContext } from 'koa-router';
import IBGEClient from '../ibgeClient';

import voteCache from '../voteCache';

const citiesRoute = async (ctx: RouterContext) => {
  try {
    const stateParam = ctx.params?.state;
    if (!stateParam) {
      ctx.status = 400;
      return;
    }

    const ibge = new IBGEClient();

    const stateInfo = await ibge.getStateInfo(stateParam);
    const stateUF = stateInfo.sigla;

    const mesh = await ibge.getStateMesh(stateInfo.id);

    const votes = Object.entries(voteCache)
      .filter(([, item]) => !!item[stateUF])
      .reduce((prev, [party, item]) => ({
        ...prev,
        [party]: item[stateUF].votes,
      }), {});

    ctx.body = {
      votes,
      mesh,
    };
  } catch (err) {
    ctx.status = 500;
    console.error('States route error', err);
  }
};

export default citiesRoute;
