import { combineReducers } from 'redux';
import cardSearchReducer from './card-search-reducer';
import playDeckReducer from '../components/PlayField/play-deck-reducer';
import gameStatsReducer from '../components/PlayfieldController/game-stats-reducer';
import zoomInImageReducer from '../components/PlayField/zoomin-image-reducer';

export default combineReducers({
  cardSearch: cardSearchReducer,
  playDeck: playDeckReducer,
  gameStats: gameStatsReducer,
  zoomInImage: zoomInImageReducer,
});