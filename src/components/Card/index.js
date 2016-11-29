import { connect } from 'react-redux';
import CardList from './component';
import { addCardToHolder, removeCardFromHolder } from '../PlayField/actions';

export default connect(
  state => ({
    cards: state.cardSearch.cards
  }),
  dispatch => ({
    addCardToHolder: (cardObj, player, holderName) => dispatch(addCardToHolder(cardObj, player, holderName)),
    removeCardFromHolder: (cardObj, player, holderName) => dispatch(removeCardFromHolder(cardObj, player, holderName)),
  })
)(CardList);