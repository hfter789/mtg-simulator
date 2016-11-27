import React, { Component } from 'react';
import CardHolder from '../CardHolder';
import Card from '../Card';
import './style.css';
import { normalize } from './utils';

const holderList = [
  {
    name: 'Battle Field',
    className: 'large-card-holder card-holder',
  },
  {
    name: 'Graveyard',
    className: 'small-card-holder card-holder',
  },
  {
    name: 'Lands',
    className: 'large-card-holder card-holder',
  },
  {
    name: 'Exile',
    className: 'small-card-holder card-holder',
  },
  {
    name: 'Hand',
    className: 'full-card-holder card-holder',
  },
  {
    name: 'Library',
    className: 'small-card-holder card-holder',
  }
];

class PlayField extends Component {

  renderHolderCards(holderName) {
    const { playDeck } = this.props;
    const normalizeHolder = normalize(holderName);
    const holderDeck = playDeck[normalizeHolder];
    if (!holderDeck) {
      return null;
    }
    const isLibrary = (normalizeHolder === 'library');
    return holderDeck.map((card, index) =>
      <Card
        key={`${index}-${index}`}
        data-holder-name={holderName}
        cardId={ card.id }
        className='PlayField-card'
        disableTap={isLibrary}
        name={card.name}
        imageUrl={card.imageUrl}
        isFacedown={isLibrary}
      />
    );
  }

  renderHolders() {
    return holderList.map((holderObj, i) =>
      <CardHolder className={holderObj.className} name={holderObj.name} key={i}>
        { this.renderHolderCards(holderObj.name) }
      </CardHolder>
    );
  }

  render() {
    return (
      <div className='PlayField-Container well'>
        { this.renderHolders() }
      </div>
    );
  }
}

export default PlayField;