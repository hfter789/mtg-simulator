import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD } from '../../constants/action-constants';
import { normalize } from './utils';

export default (state = {}, action) => {
  switch (action.type) {
    case PLAYFIELD_ADD_CARD: {
      const { holderName, cardObj } = action.payload;
      const normalizeHolder = normalize(holderName);
      const targetHolder = state[normalizeHolder] || {};
      if (!targetHolder[cardObj.id]) {
        targetHolder[cardObj.id] = {
          data: cardObj,
          count: 1,
        };
      } else {
        targetHolder[cardObj.id].count ++;
      }
      const newStateSubset = {};
      newStateSubset[normalizeHolder] = targetHolder;
      return Object.assign({}, state, newStateSubset);
    }
    case PLAYFIELD_REMOVE_CARD: {
      const { holderName, cardObj } = action.payload;
      const normalizeHolder = normalize(holderName);
      const targetHolder = state[normalizeHolder] || {};
      if (targetHolder[cardObj.id].count === 1) {
        delete targetHolder[cardObj.id];
      } else {
        targetHolder[cardObj.id].count --;
      }
      const newStateSubset = {};
      newStateSubset[normalizeHolder] = targetHolder;
      return Object.assign({}, state, newStateSubset);
    }
    default: return state || {};
  }
};
