import React from 'react';
import Subheader from 'material-ui/Subheader';

const roundIndicator = currentRound => x => {
  const round = x + 1;
  const styles = {
    width: '24px',
    height: '24px',
    textAlign: 'center',
    lineHeight: '24px',
    borderRadius: '12px',
    margin: '10px auto',
    border: '1px solid',
    borderColor: 'transparent'
  };

  if (x === currentRound) {
    styles.borderColor = 'black';
  }

  return (<p style={styles} key={round}>{round}</p>);
}

export default function RoundTrack({ currentRound }) {
  return (
    <div style={{float: 'left'}}>
      <Subheader>Round</Subheader>
      <div style={{paddingLeft: '16px'}}>
        {[...Array(20).keys()].map(roundIndicator(currentRound))}
      </div>
    </div>
  );
}