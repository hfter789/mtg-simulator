import { combineReducers } from 'redux';
import cardSearchReducer from './card-search-reducer';
import playDeckReducer from '../components/PlayField/play-deck-reducer';
import gameStatsReducer from '../components/PlayfieldController/game-stats-reducer';
import playFieldReducer from '../components/PlayField/playfield-reducer';
import cardMenuReducer from '../components/CardMenu/card-menu-reducer';

export default combineReducers({
  cardSearch: cardSearchReducer,
  playDeck: playDeckReducer,
  gameStats: gameStatsReducer,
  playField: playFieldReducer,
  cardMenu: cardMenuReducer,
});