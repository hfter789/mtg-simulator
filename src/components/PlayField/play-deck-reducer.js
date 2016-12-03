import { shuffleArray, normalize } from './utils';
import MOCK_CARD_DATA from './mock-card-data.json';
import { PLAYFIELD_ADD_CARD,
  PLAYFIELD_REMOVE_CARD,
  PLAYFIELD_TOGGLE_TAP,
  PLAYFIELD_UPDATE_CARD,
  SHUFFLE_DECK } from './constants';

MOCK_CARD_DATA[0].library = shuffleArray(MOCK_CARD_DATA[0].library);
MOCK_CARD_DATA[0].library = MOCK_CARD_DATA[0].library.map((card, index) => ({
  id: card.id,
  imageUrl: card.imageUrl,
  name: card.name,
  player: 0,
  // although i use index to generate deckId at the beginning, this
  // does not represent the index of the card within the array since
  // deck can get shuffle many times and deckId stays the same
  deckId: index,
}));

MOCK_CARD_DATA[1].library = shuffleArray(MOCK_CARD_DATA[1].library);
MOCK_CARD_DATA[1].library = MOCK_CARD_DATA[1].library.map((card, index) => ({
  id: card.id,
  imageUrl: card.imageUrl,
  name: card.name,
  player: 1,
  // although i use index to generate deckId at the beginning, this
  // does not represent the index of the card within the array since
  // deck can get shuffle many times and deckId stays the same
  deckId: index,
}));

let currentDeckId = [MOCK_CARD_DATA[0].library.length, MOCK_CARD_DATA[1].library.length];

export default (state = MOCK_CARD_DATA, action) => {
  switch (action.type) {
    case PLAYFIELD_ADD_CARD: {
      // the player id could be different from the card's original one,
      // we use the holder's player id instead
      const { holderName, cardObj, player } = action.payload;
      const normalizeHolder = normalize(holderName);
      if (normalizeHolder === 'graveyard' || normalizeHolder === 'exile' && cardObj.isToken) {
        return state;
      }
      const targetHolder = state[+player][normalizeHolder] || [];
      cardObj.player = player;
      targetHolder.unshift(cardObj);
      state[+player][normalizeHolder] = targetHolder;
      return Object.assign([], state);
    }
    case PLAYFIELD_REMOVE_CARD: {
      const { holderName, cardObj } = action.payload;
      // here we need to use cardObj's player id so that we 
      // can remove the cardObj from it's old parent
      const { player } = cardObj;
      if (holderName) {
        const normalizeHolder = normalize(holderName);
        const targetHolder = state[+player][normalizeHolder];
        for (let i = 0; i < targetHolder.length; i++) {
          if (targetHolder[i].deckId === cardObj.deckId) {
            targetHolder.splice(i, 1);
            return Object.assign([], state);
          }
        }
        return Object.assign([], state);
      }
      return state || {};
    }
    case PLAYFIELD_TOGGLE_TAP: {
      const cardObj = action.payload;
      const { 'data-holder-name': holderName, deckId, player } = cardObj;
      if (holderName) {
        const normalizeHolder = normalize(holderName);
        const targetHolder = state[+player][normalizeHolder];
        for (let i = 0; i < targetHolder.length; i++) {
          if (targetHolder[i].deckId === deckId) {
            targetHolder[i].isTapped = !targetHolder[i].isTapped;
            return Object.assign([], state);
          }
        }
      }
      return state || {};
    }

    case PLAYFIELD_UPDATE_CARD: {
      const { cardObj, counterData, tokenDesc, tokenName } = action.payload;
      let { 'data-holder-name': holderName, deckId, player } = cardObj;
      if (cardObj.isNew) {
        // new token put it on the creatures field and let play decide where to put it after
        holderName = 'creatures';
        // generate a deck id for token
        deckId = currentDeckId[+player];
        currentDeckId[+player]++;
      }
      if (holderName) {
        const normalizeHolder = normalize(holderName);
        let targetHolder = state[+player][normalizeHolder];
        if (!targetHolder) {
          state[+player][normalizeHolder] = targetHolder = [];
        }
        if (cardObj.isNew) {
          targetHolder.unshift({
            tokenName,
            tokenDesc,
            counter: counterData,
            isToken: true,
            player,
            deckId,
          });
          return Object.assign([], state);
        }
        for (let i = 0; i < targetHolder.length; i++) {
          if (targetHolder[i].deckId === deckId) {
            targetHolder[i].counter = counterData;
            targetHolder[i].tokenName = tokenName;
            targetHolder[i].tokenDesc = tokenDesc;
            return Object.assign([], state);
          }
        }
      }
      return state || {};
    }
    case SHUFFLE_DECK: {
      const { playerNum } = action.payload;
      state[playerNum].library = shuffleArray(state[playerNum].library);
      return Object.assign([], state);
    }
    default: return state || {};
  }
};
