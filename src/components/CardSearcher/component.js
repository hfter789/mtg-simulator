import React, { Component } from 'react';
import CardList from '../CardList';
import './style.css';

class CardSearcher extends Component {
  constructor(props) {
    super(props);
    this.searchCard = this.searchCard.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.state = {
      cardData: []
    };
  }

  componentDidMount() {
    this.refs.cardInput.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    this.refs.cardInput.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.refs.searchBtn.click();
    }
  }

  searchCard(e) {
    const cardName = this.refs.cardInput.value;
    this.props.searchCard(cardName);
  }

  render() {
    const { cardData } = this.props;
    return (
      <div className='CardSearcher-container'>
        <input ref='cardInput' placeholder='input card name' />
        <div className='default-btn btn' ref='searchBtn' onClick={this.searchCard}>Search</div>
        <CardList cardData={cardData} />
      </div>
    );
  }
}

export default CardSearcher;
