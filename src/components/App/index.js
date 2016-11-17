import React, { Component } from 'react';
import CardSearcher from '../CardSearcher';
import DeckManager from '../DeckManager';

class App extends Component {

  render() {
    return (
      <div className="App">
        <CardSearcher />
        <DeckManager />
      </div>
    );
  }
}

export default App;
