import axios from 'axios';

const IBGEMeshApi = 'http://servicodados.ibge.gov.br/api/v2/malhas';
const format = '?formato=application/vnd.geo+json';

const IBGELocaleApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

interface StateResponse {
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
  getCountryMesh = async () => {
    const request = await axios.get(`${IBGEMeshApi}${format}&resolucao=2`);
    return request.data;
  }

  getStateMesh = async (stateID: number) => {
    const request = await axios.get(`${IBGEMeshApi}/${stateID}${format}`);
    return request.data;
  }

  getStateInfo = async (stateUFOrId: string) => {
    const request = await axios.get<StateResponse>(`${IBGELocaleApi}/${stateUFOrId}`);
    return request.data;
  }
}

export default IBGEClient;
