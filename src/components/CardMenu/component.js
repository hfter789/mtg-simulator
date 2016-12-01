import React, { Component, PropTypes } from 'react';
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
    let { powCounter, toughCounter } = this.state;
    let { cardMenu } = this.props;
    const { cardData } = cardMenu;
    powCounter = +powCounter;
    toughCounter = +toughCounter;
    let counter = null
    if (powCounter || toughCounter) {
      counter = {powCounter, toughCounter};
    }
    this.props.updateCardCounter(cardData, counter);
    this.props.closeCardMenu();
  }

  render() {
    const { className, cardMenu } = this.props;
    const { cardData } = cardMenu;
    return (
      <div className={classNames(className, 'CardMenu-container')}>
        <img className='card' src={cardData.imageUrl} />
        <div className='CardMenu-items'>
          <p>Counter:</p>
          <input
            className='CardMenu-small-input'
            placeholder='power'
            onChange={(e) => { this.setState({powCounter: e.target.value})}}
          />
          &nbsp;/&nbsp;
          <input
            className='CardMenu-small-input'
            placeholder='toughness'
            onChange={(e) => { this.setState({toughCounter: e.target.value})}}
          />
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