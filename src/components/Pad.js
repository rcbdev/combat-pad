import React, { Component } from 'react';
import TurnOrder from './TurnOrder';
import Notes from './Notes';
import RoundTrack from './RoundTrack';
import cuid from 'cuid';

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
    if (round > 0){
      turn = state.players.length - 1;
      round--;
    }
    else {
      turn = 0;
    }
  }
  return {currentRound: round, currentTurn: turn};
};
const collectPlayerDetails = () => {
  const playerName = window.prompt("Player Name?");
  if (!playerName) {
    return;
  }
  const initiative = window.prompt("Initiative?");
  if (!initiative) {
    return;
  }
  const dex = window.prompt("Dex?");
  if (!dex) {
    return;
  }
  const pc = window.prompt("PC (y/n)?");

  return {
    name: playerName,
    initiative: initiative * 1,
    dex: dex * 1,
    pc: pc === 'y',
    id: cuid()
  };
};
const defaultState = {
  players: [],
  currentTurn: 0,
  currentRound: 0
};
const getState = () => {
  const state = localStorage.getItem('pad-state');
  return state ? JSON.parse(state) : defaultState;
}

class Pad extends Component {
  constructor(props){
    super(props);
    this.state = getState();
  }

  handleKeyDown = (e) => {
    if(!e.target.getAttribute('contenteditable')){
      switch (e.keyCode){
        case 37: // Left
          break;
        case 38: // Up
          this.setState(subtractOneFromTurn);
          break;
        case 39: // Right
          break;
        case 40: // Down
          this.setState(addOneToTurn);
          break;
        case 32: // Space
          this.setState(addOneToTurn);
          break;
        case 78: // n
          this.addPlayer();
          break;
        case 88: // x
          this.removePlayer();
          break;
        default:
          break;
      }
    }
  }

  handleBeforeUnload = () => {
    localStorage.setItem('pad-state', JSON.stringify(this.state));
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }
  
  componentWillUnMount() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  removePlayer = () => {
    this.setState(prev => ({players: prev.players.filter((p, i) => i !== prev.currentTurn)}));
  }

  addPlayer = () => {
    const player = collectPlayerDetails();
    if (!player) {
      return;
    }
    
    this.setState(prev => ({players: [...prev.players, player]}));
  }

  render() {
    const {players, currentTurn, currentRound} = this.state;
    return (
      <div>
        <TurnOrder players={players} currentTurn={currentTurn} onAddPlayer={this.addPlayer} />
        <Notes/>
        <RoundTrack currentRound={currentRound} />
      </div>
    );
  }
}

export default Pad;