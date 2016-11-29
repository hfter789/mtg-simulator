import { connect } from 'react-redux';
import component from './component';

export default connect(
  state => ({
    gameStats: state.gameStats,
  }),
)(component);