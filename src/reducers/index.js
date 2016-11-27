import { combineReducers } from 'redux';
import cardSearchReducer from './card-search-reducer';
import playDeckReducer from '../components/PlayField/reducer';

export default combineReducers({
  cardSearch: cardSearchReducer,
  playDeck: playDeckReducer,
});