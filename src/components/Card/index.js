import { connect } from 'react-redux';
import CardList from './component';
import { addCardToHolder, removeCardFromHolder } from '../../actions';

export default connect(
  state => ({
    cards: state.cardSearch.cards
  }),
  dispatch => ({
    addCardToHolder: (cardObj, holderName) => dispatch(addCardToHolder(cardObj, holderName)),
    removeCardFromHolder: (cardObj, holderName) => dispatch(removeCardFromHolder(cardObj, holderName)),
  })
)(CardList);