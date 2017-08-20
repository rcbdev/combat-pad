import React from 'react';
import Subheader from 'material-ui/Subheader';

export default function Notes() {
  return (
    <div style={{width: '700px', float: 'left'}}>
      <Subheader>Notes</Subheader>
      <div contentEditable style={{height: '600px', padding: '20px'}}></div>
    </div>
  );
}