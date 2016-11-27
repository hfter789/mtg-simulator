import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD } from '../constants/action-constants';

export function addCardToHolder(cardObj, holderName) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_ADD_CARD,
      payload: {
        cardObj,
        holderName,
      }
    });
  }
}

export function removeCardFromHolder(cardObj, holderName) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_REMOVE_CARD,
      payload: {
        cardObj,
        holderName,
      }
    });
  }
}