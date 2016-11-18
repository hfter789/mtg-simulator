import { connect } from 'react-redux';
import CardList from './component';

export default connect(
  state => ({
    cards: state.cardSearch.cards
  }),
)(CardList);