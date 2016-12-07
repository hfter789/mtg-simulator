import React, { Component, PropTypes } from 'react';
import Button from '../Button';
import './style.css';

class PlayfieldController extends Component {

  constructor(props) {
    super(props);
    this.incrementLife = this.updateLifeCounter.bind(this, 1);
    this.decrementLife = this.updateLifeCounter.bind(this, -1);
    this.createToken = this.createToken.bind(this);
  }

  updateLifeCounter(life) {
    this.props.updateLifeCounter(this.props.playerNum, life);
  }

  createToken() {
    this.props.showCardMenu({
      player: this.props.playerNum,
      isToken: true,
      isNew: true,
    });
  }

  renderLifePointController() {
    const { gameStats, playerNum } = this.props;
    return (
      <div className='Controller-life-container'>
        <p className='Controller-life-title'>Life Points</p>
        {gameStats[playerNum].life}
        &nbsp;&nbsp;
        <Button label='-' onClick={this.decrementLife} primary />
        <Button label='+' onClick={this.incrementLife} primary />
      </div>
    );
  }

  render() {
    const { playerNum, shuffleDeck, putTopToBottom, toggleLibReveal, untapAll, drawCard, mulligan } = this.props;
    return (
      <div className='Controller-container'>
        { this.renderLifePointController() }
        <Button label='Add Token' onClick={this.createToken} primary />
        <Button className='mg-top-5' label='Shuffle' onClick={shuffleDeck.bind(null, playerNum)} primary />
        <Button className='mg-top-5' label='Untap All' onClick={untapAll.bind(null, playerNum)} primary />
        <Button className='mg-top-5' label='Draw Card' onClick={drawCard.bind(null, playerNum)} primary />
        <Button className='mg-top-5' label='Mulligan' onClick={mulligan.bind(null, playerNum)} primary />
        <Button className='mg-top-5' label='Top to Bottom' onClick={putTopToBottom.bind(null, playerNum)} secondary />
        <Button className='mg-top-5' label='Toggle Library Reveal' onClick={toggleLibReveal.bind(null, playerNum)} secondary />
      </div>
    );
  }
}

PlayfieldController.propTypes = {
  playerNum: PropTypes.number.isRequired,
};

export default PlayfieldController;