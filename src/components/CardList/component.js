import React, { Component } from 'react';
import Card from '../Card';
import './style.css';

class CardList extends Component {
  render() {
    const { cards } = this.props;

    return (
      <ul className='CardList-container'>
        {
          (!cards || !cards.length) ?
            <p>Card List is Empty</p>
          :
            cards.map((card) => {
              return (
                <li className='CardList-card' key={card.multiverseid}>
                  <Card imageUrl={card.imageUrl} name={card.name} />
                  <div className='CardList-detail'>
                    <h5>{card.name}</h5>
                    <p className='CardList-desc'>{card.text}</p>
                  </div>
                </li>
              );
            })
        }
      </ul>
    );
  }
}

export default CardList;