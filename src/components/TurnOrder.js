import React from 'react';
import PlayerMarker from './PlayerMarker';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const sortFunction = (a, b) => {
  if (b.initiative === a.initiative) {
    return b.dex - a.dex;
  }
  return b.initiative - a.initiative;
}

export default function TurnOrder({ players, currentTurn, onAddPlayer }) {
  return (
    <List style={{width: '300px', float: 'left', marginRight: '50px'}}>
      <Subheader>Turn Order</Subheader>
      {players.sort(sortFunction).map((p, i) => (<PlayerMarker playerName={p.name} pc={p.pc} currentPlayer={i === currentTurn} key={p.id} />))}
      <FloatingActionButton mini={true} style={{float: 'right'}} onClick={onAddPlayer}>
        <ContentAdd />
      </FloatingActionButton>
    </List>
  );
}