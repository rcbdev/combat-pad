import React, { Component } from 'react';
import cuid from 'cuid';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const defaultState = {
  name: '',
  initiative: '',
  dex: '',
  pc: true
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
      pc: this.state.pc,
      id: cuid()
    };

    this.props.onPlayerAdd(player);
    this.setState(defaultState);
  }

  handleClose = () => {
    this.props.onClose();
    this.setState(defaultState);
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton label="Submit" primary={true} onClick={this.handlePlayerAdd} />
    ];

    return (
        <Dialog title="Add Player" actions={actions}
                modal={false} open={this.props.open}
                onRequestClose={this.handleClose}>
          <TextField floatingLabelText="Player Name" value={this.state.name} onChange={(e, x) => this.setState({name: x})} /><br/>
          <TextField floatingLabelText="Initiative" value={this.state.initiative} onChange={(e, x) => this.setState({initiative: x})} /><br/>
          <TextField floatingLabelText="Dex" value={this.state.dex} onChange={(e, x) => this.setState({dex: x})} /><br/><br/>
          <Toggle label={this.state.pc ? "PC" : "NPC"} toggled={this.state.pc} labelPosition="right" onToggle={(e, x) => this.setState({pc: x})} />
        </Dialog>
    );
  }
}

export default PlayerAdder;