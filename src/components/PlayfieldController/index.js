import { connect } from 'react-redux';
import component from './component';
import { updateLifeCounter } from './actions';
import { showCardMenu } from '../CardMenu/actions';
import { shuffleDeck, putTopToBottom } from '../PlayField/actions';

export default connect(
  state => ({
    gameStats: state.gameStats,
  }),
  dispatch => ({
    updateLifeCounter: (playerNum, change) => dispatch(updateLifeCounter(playerNum, change)),
    showCardMenu: (cardProps) => dispatch(showCardMenu(cardProps)),
    shuffleDeck: (playerNum) => dispatch(shuffleDeck(playerNum)),
    putTopToBottom: (playerNum) => dispatch(putTopToBottom(playerNum)),
  }),
)(component);