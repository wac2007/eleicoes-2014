export interface VotesByPartyState {
  [party: string]: {
    [stateUF: string]: number;
  }
}

interface StatesResponse {
  votes: VotesByPartyState;
  mesh: any;
}

const baseURL = 'http://localhost:4000/api/eleicao/2014/presidente/primeiro-turno';

class BackendClient {
  getVotesByCountry = async (): Promise<StatesResponse> => {
    const response = await fetch(`${baseURL}/estados`);
    return response.json();
  }
}

export default BackendClient;
