import { combineReducers } from 'redux';
import cardSearchReducer from './card-search-reducer';
import playDeckReducer from '../components/PlayField/reducer';
import gameStatReducer from '../components/PlayField/game-stat-reducer';
import zoomInImageReducer from '../components/PlayField/zoomin-image-reducer';

export default combineReducers({
  cardSearch: cardSearchReducer,
  playDeck: playDeckReducer,
  gameStat: gameStatReducer,
  zoomInImage: zoomInImageReducer,
});