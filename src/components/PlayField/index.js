import { connect } from 'react-redux';
import CardList from './component';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { toggleTap } from './actions';

export default connect(
  state => ({
    cardMenu: state.cardMenu,
    playDeck: state.playDeck,
    gameStat: state.gameStat,
    playField: state.playField,
  }),
  dispatch => ({
    toggleTap: cardProps => dispatch(toggleTap(cardProps)),
  })
)(DragDropContext(HTML5Backend)(CardList));