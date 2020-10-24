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
          votes: {
            1200401: 332,
          },
        },
        GO: {
          name: 'Goiás',
          votes: {
            5204003: 20,
          },
        },
      },
      PSDC: {
        AC: {
          name: 'Acre',
          votes: {
            1200401: 165,
          },
        },
        GO: {
          name: 'Goiás',
          votes: {
            5204003: 2,
          },
        },
      },
      PT: {
        AC: {
          name: 'Acre',
          votes: {
            1200401: 10,
          },
        },
      },
      PSB: {
        GO: {
          name: 'Goiás',
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
