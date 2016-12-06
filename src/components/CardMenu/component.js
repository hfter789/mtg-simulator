import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '../Button';
import './style.css';

class CardMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  submitUpdate() {
    const { cardMenu: { cardData } } = this.props;
    const { tokenName: oldTokenName, tokenDesc: oldTokenDesc, counter: oldCounter={} } = cardData;
    let { powCounter, toughCounter, tokenName=oldTokenName, tokenDesc=oldTokenDesc } = this.state;
    powCounter = +powCounter || oldCounter.powCounter || 0;
    toughCounter = +toughCounter || oldCounter.toughCounter || 0;
    let counter = null
    if (powCounter || toughCounter) {
      counter = {powCounter, toughCounter};
    }
    this.props.updateCard(cardData, counter, tokenName, tokenDesc);
    this.props.closeCardMenu();
  }

  render() {
    const { className, cardMenu } = this.props;
    const { cardData } = cardMenu;
    const { tokenName, tokenDesc, counter={} } = cardData;
    return (
      <div className={classNames(className, 'CardMenu-container')}>
        {
          cardData.isToken ?
          <div className='CardMenu-token-card'>Token</div>
          :
          <img className='card' src={cardData.imageUrl} role='presentation' />
        }
        <div className='CardMenu-items'>
          {
            cardData.isToken ?
            <input
              className='CardMenu-input'
              defaultValue={tokenName || ''}
              placeholder='Name'
              onChange={(e) => { this.setState({tokenName: e.target.value})}}
            />
            :
            null
          }
          <p>Counter:</p>
          <input
            className='CardMenu-small-input CardMenu-input'
            defaultValue={counter.powCounter}
            placeholder='power'
            onChange={(e) => { this.setState({powCounter: e.target.value})}}
          />
          &nbsp;/&nbsp;
          <input
            className='CardMenu-small-input CardMenu-input'
            defaultValue={counter.toughCounter}
            placeholder='toughness'
            onChange={(e) => { this.setState({toughCounter: e.target.value})}}
          />
          {
            cardData.isToken ?
            <input
              className='CardMenu-input'
              defaultValue={tokenDesc || ''}
              placeholder='Description'
              onChange={(e) => { this.setState({tokenDesc: e.target.value})}}
            />
            :
            null
          }
          <div className='CardMenu-buttons'>
            <Button onClick={this.submitUpdate} label='Update' primary />
            <Button onClick={this.props.closeCardMenu} label='Cancel' danger />
          </div>
        </div>
      </div>
    );
  }
}

export default CardMenu;