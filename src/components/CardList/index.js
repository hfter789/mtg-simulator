import { connect } from 'react-redux';
import component from './component';

export default connect(
  state => ({
    cards: state.cardSearch.cards
  }),
)(component);