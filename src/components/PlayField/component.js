import React, { Component } from 'react';
import CardHolder from '../CardHolder';
import Card from '../Card';
import './style.css';
import { normalize } from './utils';

const holderList = [
  {
    name: 'Creatures',
    className: 'large-card-holder card-holder',
  },
  {
    name: 'non-creature Permanents',
    className: 'small-card-holder card-holder',
  },
  {
    name: 'Lands',
    className: 'large-card-holder card-holder',
  },
  {
    name: 'Graveyard',
    className: 'small-card-holder card-holder',
  },
  {
    name: 'Hand',
    className: 'large-card-holder card-holder',
  },
  {
    name: 'Library',
    className: 'extra-small-card-holder card-holder',
  },
  {
    name: 'Exile',
    className: 'extra-small-card-holder card-holder',
  },
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
        key={card.deckId}
        data-holder-name={holderName}
        cardId={card.id}
        className='PlayField-card'
        deckId={card.deckId}
        disableTap={isLibrary}
        name={card.name}
        imageUrl={card.imageUrl}
        isFacedown={isLibrary}
        isTapped={card.isTapped}
        toggleTap={this.props.toggleTap}
      />
    );
  }

  renderController() {
    return (
      <div> 20 </div>
    );
  }

  renderPlayField() {
    return (
      <div>
        <div className='PlayField-holder-container'>
          {
            holderList.map((holderObj, i) =>
              <CardHolder className={holderObj.className} name={holderObj.name} key={i}>
                { this.renderHolderCards(holderObj.name) }
              </CardHolder>
            )
          }
        </div>
        {
          this.renderController()
        }
      </div>
    );
  }

  render() {
    return (
      <div className='PlayField-container well'>
        { this.renderPlayField() }
      </div>
    );
  }
}

export default PlayField;