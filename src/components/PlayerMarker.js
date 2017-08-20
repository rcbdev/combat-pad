import React from 'react';
import {ListItem} from 'material-ui/List';
import PersonIcon from 'material-ui/svg-icons/social/person';
import AndroidIcon from 'material-ui/svg-icons/action/android';
import ActionGrade from 'material-ui/svg-icons/action/grade';

export default function PlayerMarker({ playerName, pc, currentPlayer }) {
  const leftIcon = pc ? <PersonIcon/> : <AndroidIcon/>;
  const rightIcon = currentPlayer ? <ActionGrade/> : null;

  return (
    <ListItem primaryText={playerName} leftIcon={leftIcon} rightIcon={rightIcon} />
  );
}