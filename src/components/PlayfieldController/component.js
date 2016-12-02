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
    return (
      <div className='Controller-container'>
        { this.renderLifePointController() }
        <Button label='Add Token' onClick={this.createToken} primary />
      </div>
    )
  }
}

PlayfieldController.propTypes = {
  playerNum: PropTypes.number.isRequired,
}

export default PlayfieldController;