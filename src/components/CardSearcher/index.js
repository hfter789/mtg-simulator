import { connect } from 'react-redux';
import CardSearcher from './component';
import { searchCard } from './actions';

export default connect(
    state => ({}),
    dispatch => ({
      searchCard: cardName => dispatch(searchCard(cardName)),
    }),
)(CardSearcher);

