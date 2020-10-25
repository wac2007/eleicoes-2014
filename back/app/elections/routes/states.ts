import { RouterContext } from 'koa-router';

import voteCache from '../voteCache';
import IBGEClient from '../ibgeClient';

import { VoteStructure } from '../parseVotes';

export interface VotesByPartyState {
  [party: string]: {
    [stateUF: string]: number;
  }
}

export const transformVotes = (votes: VoteStructure): VotesByPartyState => {
  const parties = Object.entries(votes).reduce((prev, [party, item]) => {
    const states = Object.entries(item).reduce((previous, [uf, stateVotes]) => ({
      ...previous,
      [uf]: Object
        .values(stateVotes.votes)
        .reduce((prevNumber, vote) => prevNumber + vote, 0),
    }), {});

    return {
      ...prev,
      [party]: states,
    };
  }, {});

  return parties;
};

const statesRoute = async (ctx: RouterContext) => {
  try {
    const ibge = new IBGEClient();
    const mesh = await ibge.getCountryMesh();

    ctx.body = {
      votes: transformVotes(voteCache),
      mesh,
    };
  } catch (err) {
    ctx.status = 500;
    console.error('States route error', err);
  }
};

export default statesRoute;
