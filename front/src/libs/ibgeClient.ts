const IBGELocaleApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

export interface StateResponse {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

class IBGEClient {
  getStates = async (): Promise<StateResponse[]> => {
    const request = await fetch(`${IBGELocaleApi}`);
    const states = await request.json() as StateResponse[];
    return states.sort((a, b) => (a.nome < b.nome ? -1 : 1));
  }
}

export default IBGEClient;
