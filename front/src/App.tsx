import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import BackendClient from './libs/backend';
import BrazilMap from './components/BrazilMap';
import './App.scss';
import IBGEClient, { StateResponse } from './libs/ibgeClient';
import StateSelector from './components/StateSelector';
import PartySelector from './components/PartySelector';
import { VotesByPartyState } from '../../back/app/elections/routes/states';

interface State {
  geo: any;
  partyList?: string[];
  selectedParty: string;

  stateList?: StateResponse[];
  selectedState: number;

  votes?: VotesByPartyState;
}

class App extends Component<unknown, State> {
  private backend = new BackendClient();

  private ibgeClient = new IBGEClient();

  constructor(props: any) {
    super(props);
    this.state = {
      geo: '',
      selectedParty: '',
      selectedState: -1,
    };
  }

  async componentDidMount() {
    const [response, states] = await Promise.all([
      this.backend.getVotesByCountry(),
      this.ibgeClient.getStates(),
    ]);

    this.setState(() => ({
      geo: response.mesh,
      stateList: states,
      partyList: Object.keys(response.votes),
      votes: response.votes,
    }));
  }

  render() {
    const { votes, selectedParty = '' } = this.state;

    const voteObject = votes?.[selectedParty || ''] || {};
    const totalSum = Object.values(voteObject).reduce((prev, curr) => prev + curr, 0);

    const withShare = Object.entries(voteObject)
      .reduce((prev, [stateUF, voteByState]) => {
        const state = this.state.stateList?.find((s) => s.sigla === stateUF);

        if (!state) {
          return prev;
        }

        return {
          ...prev,
          [state.id]: {
            votes: voteByState,
            share: voteByState / totalSum,
            uf: state.sigla,
            name: state.nome,
          },
        };
      }, {});

    return (
      <div className="App">
        <Typography component="h1" variant="h1" className="title">Resultados eleições 2014</Typography>
        <div className="selectorGroup">
          {
            this.state.partyList && (
              <PartySelector
                partyList={this.state.partyList}
                selected={this.state.selectedParty}
                onChange={(event) => {
                  this.setState(() => ({
                    selectedParty: event.target.value as string,
                  }));
                }}
              />
            )
          }
          {
            this.state.stateList && (
              <StateSelector
                selected={this.state.selectedState}
                stateList={this.state.stateList}
                onChange={(event) => {
                  this.setState(() => ({
                    selectedParty: event.target.value as string,
                  }));
                }}
              />
            )
          }
        </div>
        <div>
          {
            this.state.geo
            && this.state.selectedParty
            && (
              <BrazilMap
                key={`${this.state.selectedParty}-${this.state.selectedState}`}
                states={withShare}
                geo={this.state.geo}
              />
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
