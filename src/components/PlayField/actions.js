import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD, PLAYFIELD_TOGGLE_TAP } from './constants';

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

export function toggleTap(props) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_TOGGLE_TAP,
      payload: props,
    })
  };
}