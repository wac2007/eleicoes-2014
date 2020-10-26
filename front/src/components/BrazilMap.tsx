import React, { Component } from 'react';
import { Map, GeoJSON } from 'react-leaflet';
import { scaleThreshold } from 'd3-scale';

import './BrazilMap.scss';

// Round to 2 decimal places
const round = (input: number) => Math.round((input + Number.EPSILON) * 100);

const formatNumber = (input: number) => {
  const num = round(input);
  if (num < 1) {
    return '< 1';
  }
  return num;
};

const makePalette = (min: number, max: number) => {
  const d = (max - min) / 5;
  return scaleThreshold(['#00429d', '#4771b2', '#73a2c6', '#a5d5d8', '#ffffe0'].reverse())
    .domain([min + d * 1, min + d * 2, min + d * 3, min + d * 4]);
};

interface Props {
  geo: any;
  states: {
    [id: number]: {
      votes: number;
      share: number;
      uf: string;
      name: string;
    }
  }
}

interface State {
  lat: number;
  lng: number;
  zoom: number;
}

class BrazilMap extends Component<Props, State> {
  private getColor: (input: number) => string | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      lat: -20,
      lng: -55,
      zoom: 4,
    };
    const maxValue = Object.values(props.states)
      .reduce((prev, st) => (st.share > prev ? st.share : prev), 0);
    this.getColor = makePalette(0, maxValue);
  }

  getStyle = (feature: any) => {
    if (!feature?.properties?.codarea) {
      return {};
    }
    const state = this.getStateFromFeature(feature);
    if (!state) {
      return {};
    }
    return {
      fillColor: this.getColor(state.share),
      weight: 2,
      opacity: 1,
      color: '#FFF',
      dashArray: '3',
      fillOpacity: 0.5,
    };
  }

  getStateFromFeature = (feature: any) => {
    const { codarea } = feature.properties;
    const id = parseInt(codarea, 10);

    return this.props.states[id] || null;
  }

  render() {
    const position = { lat: this.state.lat, lng: this.state.lng };

    return (
      <div>
        <Map center={position} zoom={this.state.zoom}>
          <GeoJSON
            data={this.props.geo}
            style={this.getStyle}
            onEachFeature={(feature, layer) => {
              const state = this.getStateFromFeature(feature);
              const { share, name } = state;

              const popupContent = `Estado: ${name} <br> <em>${formatNumber(share)}% dos votos<em>`;
              layer.bindTooltip(popupContent);
            }}
          />

        </Map>
      </div>
    );
  }
}

export default BrazilMap;
