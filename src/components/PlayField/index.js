import { connect } from 'react-redux';
import CardList from './component';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default connect(
  state => ({
    playingDeck: state.playingDeck
  }),
)(DragDropContext(HTML5Backend)(CardList));