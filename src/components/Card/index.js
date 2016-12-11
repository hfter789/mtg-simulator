import { connect } from 'react-redux';
import CardList from './component';
import { addCardToHolder, removeCardFromHolder, showZoomInImage } from '../PlayField/actions';
import { showCardMenu } from '../CardMenu/actions';

export default connect(
  state => ({
    cards: state.cardSearch.cards
  }),
  dispatch => ({
    addCardToHolder: (cardObj, player, holderName, delta, lastOffset) => dispatch(addCardToHolder(cardObj, player, holderName, delta, lastOffset)),
    removeCardFromHolder: (cardObj, player, holderName) => dispatch(removeCardFromHolder(cardObj, player, holderName)),
    showZoomInImage: (coord, props) => dispatch(showZoomInImage(coord, props)),
    removeZoomInImage: () => dispatch(showZoomInImage()),
    showCardMenu: (props) => dispatch(showCardMenu(props)),
  })
)(CardList);