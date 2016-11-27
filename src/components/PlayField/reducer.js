import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD } from '../../constants/action-constants';
import { normalize } from './utils';
import MOCK_CARD_DATA from './mock-card-data.json';

export default (state = MOCK_CARD_DATA, action) => {
  switch (action.type) {
    case PLAYFIELD_ADD_CARD: {
      const { holderName, cardObj } = action.payload;
      const normalizeHolder = normalize(holderName);
      const targetHolder = state[normalizeHolder] || [];
      targetHolder.push(cardObj);
      const newStateSubset = {};
      newStateSubset[normalizeHolder] = targetHolder;
      return Object.assign({}, state, newStateSubset);
    }
    case PLAYFIELD_REMOVE_CARD: {
      const { holderName, cardObj } = action.payload;
      if (holderName) {
        const normalizeHolder = normalize(holderName);
        const targetHolder = state[normalizeHolder];
        for (let i = 0; i < targetHolder.length; i++) {
          if (targetHolder[i].id === cardObj.id) {
            targetHolder.splice(i, 1);
            break;
          }
        }
        return Object.assign({}, state);
      }
      return state || {};
    }
    default: return state || {};
  }
};
