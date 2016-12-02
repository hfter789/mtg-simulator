import { connect } from 'react-redux';
import component from './component';
import { closeCardMenu } from './actions';
import { updateCard } from '../PlayField/actions';

export default connect(
  state => ({
    cardMenu: state.cardMenu
  }),
  dispatch => ({
    closeCardMenu: () => dispatch(closeCardMenu()),
    updateCard: (cardProps, counter, tokenName, tokenDesc) =>
      dispatch(updateCard(cardProps, counter, tokenName, tokenDesc)),
  }),
)(component);