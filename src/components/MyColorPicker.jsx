import React from 'react';
import { AlphaPicker } from 'react-color';

export default class MyColorPicker extends React.Component {
  state = {
    background: '#fff',
    alpha: 1
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex, alpha: color.alpha });
  };

  render() {
    return (
      <AlphaPicker
        color={ this.state.background }
        alpha={this.state.alpha}
        onChange={ this.handleChangeComplete }
      />
    );
  }
}