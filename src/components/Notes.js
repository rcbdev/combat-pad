import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';

class Notes extends Component {
  handleBeforeUnload = () => {
    localStorage.setItem('pad-notes', this.notesHolder.innerHTML);
  }

  componentDidMount = () => {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    this.notesHolder.innerHTML = localStorage.getItem('pad-notes') || '';
  }
  
  componentWillUnMount = () => {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  render() {
    return (
      <div style={{width: '700px', float: 'left'}}>
        <Subheader>Notes</Subheader>
        <div contentEditable style={{height: '600px', padding: '20px'}} ref={x => this.notesHolder = x}></div>
      </div>
    );
  }
}

export default Notes;