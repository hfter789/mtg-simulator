import { combineReducers } from 'redux';
import cardSearchReducer from './card-search-reducer';

export default combineReducers({
  cardSearch: cardSearchReducer
});