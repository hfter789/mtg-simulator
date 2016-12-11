import { shuffleArray, normalize } from './utils';
import MOCK_CARD_DATA1 from '../../../decks/life.json';
import MOCK_CARD_DATA2 from '../../../decks/dark.json';
import { PLAYFIELD_ADD_CARD,
  PLAYFIELD_REMOVE_CARD,
  PLAYFIELD_TOGGLE_TAP,
  PLAYFIELD_UPDATE_CARD,
  SHUFFLE_DECK,
  PLAYFIELD_TOP_CARD_TO_BOT,
  PLAYFIELD_UNTAP_ALL,
  PLAYFIELD_CLONE_CARD,
  PLAYFIELD_DRAW_CARD,
  PLAYFIELD_MULLIGAN,
  } from './constants';

const MOCK_CARD_DATA = [{library: MOCK_CARD_DATA1}, {library: MOCK_CARD_DATA2}];
MOCK_CARD_DATA[0].library = shuffleArray(MOCK_CARD_DATA[0].library);
MOCK_CARD_DATA[0].library = MOCK_CARD_DATA[0].library.map((card, index) => ({
  id: card.id,
  imageUrl: card.imageUrl,
  name: card.name,
  player: 0,
  holderName: 'library',
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
  holderName: 'library',
  // although i use index to generate deckId at the beginning, this
  // does not represent the index of the card within the array since
  // deck can get shuffle many times and deckId stays the same
  deckId: index,
}));

let currentDeckId = [MOCK_CARD_DATA[0].library.length, MOCK_CARD_DATA[1].library.length];
let mulliganCount = [7, 7];

export default (state = MOCK_CARD_DATA, action) => {
  switch (action.type) {
    case PLAYFIELD_ADD_CARD: {
      // the player id could be different from the card's original one,
      // we use the holder's player id instead
      const { holderName, cardObj, player, delta, lastOffset } = action.payload;
      const normalizeHolder = normalize(holderName);
      // token just disappear
      if ((normalizeHolder === 'graveyard' || normalizeHolder === 'exile') && cardObj.isToken) {
        return state;
      }
      if (normalizeHolder === 'main') {
        // object coming from other holder, we should set offset to 0, 0
        if (cardObj.holderName !== holderName || player !== cardObj.player) {
          cardObj.offset = {
             // subtract the padding to get the correct coordinate
            x: lastOffset.x-25,
            y: lastOffset.y-20
          };
        } else {
          // handles user dragging card around in the main holder
          const { x, y } = cardObj.offset;
          cardObj.offset = {
            x: x + delta.x,
            y: y + delta.y
          };
        }
      }
      const targetHolder = state[+player][normalizeHolder] || [];
      cardObj.player = player;
      cardObj.holderName = holderName;
      targetHolder.unshift(cardObj);
      state[+player][normalizeHolder] = targetHolder;
      return Object.assign([], state);
    }
    case PLAYFIELD_REMOVE_CARD: {
      debugger;
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
      return state || [];
    }
    case PLAYFIELD_TOGGLE_TAP: {
      const cardObj = action.payload;
      const { holderName, deckId, player } = cardObj;
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
      return state || [];
    }

    case PLAYFIELD_UPDATE_CARD: {
      const { cardObj, counterData, tokenDesc, tokenName } = action.payload;
      let { holderName, deckId, player } = cardObj;
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
      return state || [];
    }
    case PLAYFIELD_CLONE_CARD: {
      const { cardObj } = action.payload;
      let { holderName, player } = cardObj;
      const normalizeHolder = normalize(holderName);
      let targetHolder = state[+player][normalizeHolder];
      const deckId = currentDeckId[+player];
      currentDeckId[+player]++;
      targetHolder.unshift({
        ...cardObj,
        deckId,
      });
      return Object.assign([], state);
    }
    case PLAYFIELD_DRAW_CARD: {
      const { playerNum } = action.payload;
      if (!state[playerNum].hand) {
        state[playerNum].hand = [];
      }
      state[playerNum].hand.unshift({
        ...state[playerNum].library.shift(),
        holderName: 'hand',
      });
      return Object.assign([], state);
    }
    case PLAYFIELD_MULLIGAN: {
      const { playerNum } = action.payload;
      if (!state[playerNum].hand) {
        state[playerNum].hand = [];
      }
      const oldHand = state[playerNum].hand;
      state[playerNum].hand = [];
      oldHand.forEach((cardObj) => {
        state[playerNum].library.push(cardObj);
      });
      state[playerNum].library = shuffleArray(state[playerNum].library);
      for (let i = 0; i < mulliganCount[playerNum]; i++) {
        state[playerNum].hand.unshift(state[playerNum].library.shift());
      }
      mulliganCount[playerNum]--;
      return Object.assign([], state);
    }
    case SHUFFLE_DECK: {
      const { playerNum } = action.payload;
      state[playerNum].library = shuffleArray(state[playerNum].library);
      return Object.assign([], state);
    }
    case PLAYFIELD_TOP_CARD_TO_BOT: {
      const { playerNum } = action.payload;
      state[playerNum].library.push(state[playerNum].library.shift());
      return Object.assign([], state);
    }
    case PLAYFIELD_UNTAP_ALL: {
      const { playerNum } = action.payload;
      const cardMap = state[playerNum];
      Object.keys(cardMap).forEach(cardMapKey => {
        cardMap[cardMapKey].forEach(card => {
          card.isTapped = false;
        });
      });
      return Object.assign([], state);
    }
    default: return state || [];
  }
};
