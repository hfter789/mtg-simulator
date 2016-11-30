import { connect } from 'react-redux';
import component from './component';
import { updateLifeCounter } from './actions';

export default connect(
  state => ({
    gameStats: state.gameStats,
  }),
  dispatch => ({
    updateLifeCounter: (playerNum, change) => dispatch(updateLifeCounter(playerNum, change)),
  }),
)(component);