import React, { Component } from 'react';
import CardHolder from '../CardHolder';
import Card from '../Card';
import PlayfieldController from '../PlayfieldController';
import CardMenu from '../CardMenu';
import './style.css';
import { normalize } from './utils';

const holderList = [
  {
    name: 'Main',
    className: 'main-holder card-holder',
  },
  {
    name: 'Graveyard',
    className: 'extra-small-card-holder card-holder',
  },
  {
    name: 'Exile',
    className: 'extra-small-card-holder card-holder',
  },
  {
    name: 'Hand',
    className: 'large-card-holder card-holder',
  },
  {
    name: 'Library',
    className: 'extra-small-card-holder card-holder',
  },
];

class PlayField extends Component {

  renderHolderCards(playerNum, holderName) {
    const { playDeck, playField } = this.props;
    const normalizeHolder = normalize(holderName);
    const holderDeck = playDeck[playerNum][normalizeHolder];
    if (!holderDeck) {
      return null;
    }
    const isLibrary = (normalizeHolder === 'library');
    const isMain = (normalizeHolder === 'main');
    return holderDeck.map((card, index) =>
      <Card
        key={card.deckId}
        player={playerNum}
        cardId={card.id}
        className='card'
        disableTap={isLibrary}
        isFacedown={isLibrary && !playField.isLibraryReveal[playerNum]}
        toggleTap={this.props.toggleTap}
        containerStyle={ isMain ? {
          position: 'absolute',
          left: card.offset.x,
          top: card.offset.y,
          height: '100px',
        } : null}
        { ...card }
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

  renderCardMenuOverlay() {
    const { cardMenu } = this.props;
    if (cardMenu && cardMenu.cardData) {
      return (
        <div className='PlayField-overlay'>
          <CardMenu className='PlayField-card-menu well' />
        </div>
      )
    }
  }

  renderZoomInImage() {
    const { zoomInImage={} } = this.props.playField;
    const { coord, props:cardProps } = zoomInImage;
    if (!coord || !cardProps) {
      return null;
    }
    let {x, y} = coord;
    if (y > 400) {
      y = 400;
    }
    return <img className='PlayField-zoomin-image' src={cardProps.imageUrl} style={{
      left: x,
      top: y
    }} role='presentation' />
  }

  render() {
    return (
      <div className='PlayField-container well'>
        { this.renderPlayField(0) }
        <hr className='PlayField-separator' />
        { this.renderPlayField(1) }
        { this.renderZoomInImage() }
        { this.renderCardMenuOverlay() }
      </div>
    );
  }
}

export default PlayField;