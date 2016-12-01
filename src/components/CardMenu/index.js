import { connect } from 'react-redux';
import component from './component';
import { closeCardMenu } from './actions';
import { updateCardCounter } from '../PlayField/actions';

export default connect(
  state => ({
    cardMenu: state.cardMenu
  }),
  dispatch => ({
    closeCardMenu: () => dispatch(closeCardMenu()),
    updateCardCounter: (cardProps, counter) => dispatch(updateCardCounter(cardProps, counter)),
  }),
)(component);