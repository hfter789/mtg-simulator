import { shuffleArray } from './utils';
import { normalize } from './utils';
import MOCK_CARD_DATA from './mock-card-data.json';
import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD, PLAYFIELD_TOGGLE_TAP } from './constants';

MOCK_CARD_DATA.library = shuffleArray(MOCK_CARD_DATA.library);
MOCK_CARD_DATA.library = MOCK_CARD_DATA.library.map((card, index) => ({
  id: card.id,
  imageUrl: card.imageUrl,
  name: card.name,
  // although i use index to generate deckId at the beginning, this
  // does not represent the index of the card within the array since
  // deck can get shuffle many times and deckId stays the same
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
      debugger;
      const { holderName, cardObj } = action.payload;
      if (holderName) {
        const normalizeHolder = normalize(holderName);
        const targetHolder = state[normalizeHolder];
        for (let i = 0; i < targetHolder.length; i++) {
          if (targetHolder[i].deckId === cardObj.deckId) {
            targetHolder.splice(i, 1);
            return Object.assign({}, state);
          }
        }
        return Object.assign({}, state);
      }
      return state || {};
    }
    case PLAYFIELD_TOGGLE_TAP: {
      debugger;
      const { holderName, cardObj } = action.payload;
      if (holderName) {
        const normalizeHolder = normalize(holderName);
        const targetHolder = state[normalizeHolder];
        for (let i = 0; i < targetHolder.length; i++) {
          if (targetHolder[i].deckId === cardObj.deckId) {
            targetHolder.splice(i, 1);
            return Object.assign({}, state);
          }
        }
      }
      return state || {};
    }
    default: return state || {};
  }
};
