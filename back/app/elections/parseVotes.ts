import { merge } from 'lodash';

export interface VoteStructure {
  [party: string]: {
    [stateUF: string]: {
      name: string;
      votes: {
        [cityID: string]: number;
      }
    }
  }
}

export type VoteCell = [string, string, number, number, string];

export type JSONitem =
  [string, string, string, string, VoteCell[]] |
  [string, string, string, string, string, string, ...VoteCell[]];

export interface ReduceCityParams {
  voteList: VoteCell[];
  stateUF: string;
  state: string;
  cityID: string;
}
export const reduceCity = ({
  voteList, state, stateUF, cityID,
}: ReduceCityParams): VoteStructure => voteList.reduce((prev, vote) => {
  const [party, , candidateVotes] = vote;

  const cityVotes = (prev?.[party]?.[stateUF]?.votes?.[cityID] || 0) + candidateVotes;

  const currentVote: VoteStructure = {
    ...prev,
    [party]: {
      ...prev?.[party],
      [stateUF]: {
        name: state,
        votes: {
          ...prev?.[party]?.[stateUF]?.votes,
          [cityID]: cityVotes,
        },
      },
    },
  };
  return currentVote;
}, {} as VoteStructure);

export const parseVotesArray = (rawData: JSONitem[]): VoteStructure => rawData
  .filter((item) => item[0] !== 'UF')
  .reduce((previous, item: JSONitem) => {
    const [, cityID, , , state, stateUF, ...votes] = item;

    const computedVotes = reduceCity({
      cityID,
      state: (state as string),
      stateUF,
      voteList: votes,
    });

    return merge(previous, computedVotes);
  }, {});
