import React, { Component } from 'react';
import CardHolder from '../CardHolder';
import Card from '../Card';
import './style.css';
import { normalize } from './utils';
import mtgCardBack from './assets/mtg-cardback.jpg';

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

  renderLibraryHolder() {
    return (
      <Card
        disableDrag={true}
        disableTap={true}
        className='PlayField-card'
        imageUrl={mtgCardBack}
      />
    );
  }

  renderHolderCards(holderName) {
    const { playDeck } = this.props;
    const normalizeHolder = normalize(holderName);
    const holderDeck = playDeck[normalizeHolder];
    if (!holderDeck) {
      return null;
    }
    const cardComponents = [];
    Object.keys(holderDeck).forEach((cardId, index) => {
      const { count, data:card } = holderDeck[cardId];
      for (let i = 0; i < count; i++) {
        cardComponents.push(
          <Card
            key={`${index}-${i}`}
            data-holder-name={holderName}
            cardId={ cardId }
            className='PlayField-card'
            name={card.name}
            imageUrl={card.imageUrl}
          />
        );
      }
    });
    return cardComponents;
  }

  renderHolders() {
    return holderList.map((holderObj, i) =>
      <CardHolder className={holderObj.className} name={holderObj.name} key={i}>
        { holderObj.name === 'Library' ? this.renderLibraryHolder() : this.renderHolderCards(holderObj.name) }
      </CardHolder>
    );
  }

  render() {
    return (
      <div className='PlayField-Container well'>
        { this.renderHolders() }
        <Card
          cardId='213613'
          className='PlayField-card'
          name='card'
          imageUrl='http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=213613&type=card'
        />
      </div>
    );
  }
}

export default PlayField;