import { RouterContext } from 'koa-router';

import votes from '../voteCache';
import IBGEClient from '../ibgeClient';

const statesRoute = async (ctx: RouterContext) => {
  try {
    const ibge = new IBGEClient();
    const mesh = await ibge.getCountryMesh();

    ctx.body = {
      votes,
      mesh,
    };
  } catch (err) {
    ctx.status = 500;
    console.error('States route error', err);
  }
};

export default statesRoute;
