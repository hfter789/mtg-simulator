import React, { Component } from 'react';
import CardHolder from '../CardHolder';
import Card from '../Card';
import PlayfieldController from '../PlayfieldController';
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

  renderHolderCards(playerNum, holderName) {
    const { playDeck } = this.props;
    const normalizeHolder = normalize(holderName);
    const holderDeck = playDeck[playerNum][normalizeHolder];
    if (!holderDeck) {
      return null;
    }
    const isLibrary = (normalizeHolder === 'library');
    return holderDeck.map((card, index) =>
      <Card
        key={card.deckId}
        data-holder-name={holderName}
        player={playerNum}
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

  renderPlayField(playerNum) {
    return (
      <div>
        <div className='PlayField-holder-container'>
          {
            holderList.map((holderObj, i) =>
              <CardHolder className={holderObj.className} name={holderObj.name} key={i} player={playerNum}>
                { this.renderHolderCards(playerNum, holderObj.name) }
              </CardHolder>
            )
          }
        </div>
        <PlayfieldController playerNum={playerNum} />
      </div>
    );
  }

  renderZoomInImage() {
    const { zoomInImage = {} } = this.props;
    const { coord, props:cardProps } = zoomInImage;
    if (!coord || !cardProps) {
      return null;
    }
    return <img className='PlayField-zoomin-image' src={cardProps.imageUrl} style={{
      left: coord.x,
      top: coord.y
    }}/>
  }

  render() {
    return (
      <div className='PlayField-container well'>
        { this.renderPlayField(0) }
        { this.renderPlayField(1) }
        { this.renderZoomInImage() }
      </div>
    );
  }
}

export default PlayField;