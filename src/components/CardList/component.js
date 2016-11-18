import React, { Component } from 'react';
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
                  <img className='CardList-img' src={card.imageUrl} alt={card.name}/>
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