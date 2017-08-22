import React, { Component } from 'react';
import cuid from 'cuid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const defaultState = {
  name: '',
  initiative: '',
  dex: '',
  pc: ''
};

class PlayerAdder extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  handlePlayerAdd = () => {
    const player = {
      name: this.state.name,
      initiative: this.state.initiative * 1,
      dex: this.state.dex * 1,
      pc: this.state.pc === 'y',
      id: cuid()
    };

    this.props.onPlayerAdd(player);
    this.setState(defaultState);
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.props.onClose} />,
      <FlatButton label="Submit" primary={true} onClick={this.handlePlayerAdd} />
    ];

    return (
        <Dialog title="Add Player" actions={actions}
                modal={false} open={this.props.open}
                onRequestClose={this.props.onClose}>
          <TextField hintText="Player Name" value={this.state.name} onChange={(e, x) => this.setState({name: x})} /><br/>
          <TextField hintText="Initiative" value={this.state.initiative} onChange={(e, x) => this.setState({initiative: x})} /><br/>
          <TextField hintText="Dex" value={this.state.dex} onChange={(e, x) => this.setState({dex: x})} /><br/>
          <TextField hintText="PC y/n" value={this.state.pc} onChange={(e, x) => this.setState({pc: x})} />
        </Dialog>
    );
  }
}

export default PlayerAdder;