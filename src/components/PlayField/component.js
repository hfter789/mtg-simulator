import React, { Component } from 'react';
import CardHolder from '../CardHolder';
import Card from '../Card';
import './style.css';

class PlayField extends Component {
  render() {
    const { playingDeck } = this.props;

    return (
      <div className='play-field-container well'>
        <CardHolder className='large-card-holder card-holder' name='Battle Field' />
        <CardHolder className='small-card-holder card-holder' name='Graveyard' />
        <CardHolder className='large-card-holder card-holder' name='Lands' />
        <CardHolder className='small-card-holder card-holder' name='Exile' />
        <CardHolder className='full-card-holder card-holder' name='Hand' />
        <CardHolder className='small-card-holder card-holder' name='Library' />
        <Card
          cardId='213613'
          className='card'
          name='card'
          imageUrl='http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=213613&type=card'
        />
      </div>
    );
  }
}

export default PlayField;