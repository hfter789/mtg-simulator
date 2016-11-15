import React, { Component } from 'react';
import './style.css';

class CardList extends Component {
  render() {
    const { cardData } = this.props;

    return (
      <ul className='CardList-container'>
        {
          (!cardData || !cardData.length) ?
            <p>Card List is Empty</p>
          :
            cardData.map((card) => {
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