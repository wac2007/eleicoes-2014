import mock from './mocks/voteMock.json';
import {
  parseVotesArray, JSONitem, VoteStructure,
} from './parseVotes';

describe('ParseVotes', () => {
  it('should parse cityVote', () => {
    const expected: VoteStructure = {
      PRTB: {
        AC: {
          name: 'Acre',
          total: 332,
          votes: {
            1200401: 332,
          },
        },
        GO: {
          name: 'Goiás',
          total: 20,
          votes: {
            5204003: 20,
          },
        },
      },
      PSDC: {
        AC: {
          name: 'Acre',
          total: 165,
          votes: {
            1200401: 165,
          },
        },
        GO: {
          name: 'Goiás',
          total: 2,
          votes: {
            5204003: 2,
          },
        },
      },
      PT: {
        AC: {
          name: 'Acre',
          total: 10,
          votes: {
            1200401: 10,
          },
        },
      },
      PSB: {
        GO: {
          name: 'Goiás',
          total: 521,
          votes: {
            5204003: 521,
          },
        },
      },
    };

    const output = parseVotesArray(mock as JSONitem[]);
    expect(output).toStrictEqual(expected);
  });
});
