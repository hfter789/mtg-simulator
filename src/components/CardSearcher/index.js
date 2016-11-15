import React, { Component } from 'react';
import axios from 'axios';
import CardList from '../CardList';
import './style.css';
const MTG_API = 'https://api.magicthegathering.io/v1/cards';

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
    const url = `${MTG_API}?name=${cardName}`;
    const self = this;
    axios.get(url)
    .then(function (response) {
      if (response.status === 200) {
        self.setState({
          cardData: response.data.cards
        });
      } else {
        console.log(response.statusText);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { cardData } = this.state;
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
