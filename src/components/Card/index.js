import { connect } from 'react-redux';
import CardList from './component';
import { addCardToHolder, removeCardFromHolder, showZoomInImage } from '../PlayField/actions';

export default connect(
  state => ({
    cards: state.cardSearch.cards
  }),
  dispatch => ({
    addCardToHolder: (cardObj, player, holderName) => dispatch(addCardToHolder(cardObj, player, holderName)),
    removeCardFromHolder: (cardObj, player, holderName) => dispatch(removeCardFromHolder(cardObj, player, holderName)),
    showZoomInImage: (coord, props) => dispatch(showZoomInImage(coord, props)),
    removeZoomInImage: (coord, props) => dispatch(showZoomInImage()),
  })
)(CardList);