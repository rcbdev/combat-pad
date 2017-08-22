import React, { Component } from 'react';
import TurnOrder from './TurnOrder';
import Notes from './Notes';
import RoundTrack from './RoundTrack';
import PlayerAdder from './PlayerAdder';

const addOneToTurn = (state) => {
  let turn = state.currentTurn + 1;
  let round = state.currentRound;
  if (turn >= state.players.length) {
    turn = 0;
    round++;
  }
  return {currentRound: round, currentTurn: turn};
};

const subtractOneFromTurn = (state) => {
  let turn = state.currentTurn - 1;
  let round = state.currentRound;
  if (turn < 0) {
    if (round > 0) {
      turn = state.players.length - 1;
      round--;
    }
    else {
      turn = 0;
    }
  }
  return {currentRound: round, currentTurn: turn};
};

const defaultState = {
  players: [],
  currentTurn: 0,
  currentRound: 0,
  open: false
};

const getState = () => {
  const state = localStorage.getItem('pad-state') || '{}';
  return {...defaultState, ...JSON.parse(state)};
}

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }

  keyHandlers = {
    "38": () => this.setState(subtractOneFromTurn), // Up
    "40": () => this.setState(addOneToTurn), // Down
    "32": () => this.setState(addOneToTurn), // Space
    "78": () => this.addPlayer(), // n
    "88": () => this.removePlayer(), // x
  }

  handleKeyDown = (e) => {
    if (!e.target.getAttribute('contenteditable')) {
      const keyCode = e.keyCode.toString();
      if (this.keyHandlers.hasOwnProperty(keyCode)) {
        this.keyHandlers[keyCode]();
      }
    }
  }

  handleBeforeUnload = () => localStorage.setItem('pad-state', JSON.stringify(this.state));

  removePlayer = () => this.setState(prev => ({players: prev.players.filter((p, i) => i !== prev.currentTurn)}));

  addPlayer = () => this.setState({open: true});

  handlePlayerAdd = (player) => this.setState(prev => ({open: false, players: [...prev.players, player]}));

  handleClose = () => this.setState({open: false});

  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
  
  componentWillUnMount = () => {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  render() {
    const {players, currentTurn, currentRound} = this.state;
    return (
      <div>
        <TurnOrder players={players} currentTurn={currentTurn} onAddPlayer={this.addPlayer} />
        <Notes/>
        <RoundTrack currentRound={currentRound} />
        <PlayerAdder open={this.state.open} onClose={this.handleClose} onPlayerAdd={this.handlePlayerAdd} />
      </div>
    );
  }
}

export default Pad;