import { shuffleArray } from './utils';
import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD } from '../../constants/action-constants';
import { normalize } from './utils';
import MOCK_CARD_DATA from './mock-card-data.json';

MOCK_CARD_DATA.library = shuffleArray(MOCK_CARD_DATA.library);
MOCK_CARD_DATA.library = MOCK_CARD_DATA.library.map((card, index) => ({
  id: card.id,
  imageUrl: card.imageUrl,
  name: card.name,
  deckId: index,
}));

export default (state = MOCK_CARD_DATA, action) => {
  switch (action.type) {
    case PLAYFIELD_ADD_CARD: {
      const { holderName, cardObj } = action.payload;
      const normalizeHolder = normalize(holderName);
      const targetHolder = state[normalizeHolder] || [];
      targetHolder.unshift(cardObj);
      const newStateSubset = {};
      newStateSubset[normalizeHolder] = targetHolder;
      return Object.assign({}, state, newStateSubset);
    }
    case PLAYFIELD_REMOVE_CARD: {
      const { holderName, cardObj } = action.payload;
      if (holderName) {
        const normalizeHolder = normalize(holderName);
        const targetHolder = state[normalizeHolder];
        targetHolder.splice(cardObj.deckId, 1);
        return Object.assign({}, state);
      }
      return state || {};
    }
    default: return state || {};
  }
};
