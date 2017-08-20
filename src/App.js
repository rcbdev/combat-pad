import React, { Component } from 'react';
import { Pad } from './components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Pad/>
      </MuiThemeProvider>
    );
  }
}

export default App;
