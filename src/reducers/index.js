import { combineReducers } from 'redux';
import cardSearchReducer from './card-search-reducer';
import playDeckReducer from '../components/PlayField/reducer';
import gameStateReducer from '../components/PlayField/game-state-reducer';

export default combineReducers({
  cardSearch: cardSearchReducer,
  playDeck: playDeckReducer,
  gameState: gameStateReducer,
});