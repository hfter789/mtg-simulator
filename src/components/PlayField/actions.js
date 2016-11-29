import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD, PLAYFIELD_TOGGLE_TAP } from './constants';

export function addCardToHolder(cardObj, player, holderName) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_ADD_CARD,
      payload: {
        cardObj,
        player,
        holderName,
      }
    });
  }
}

export function removeCardFromHolder(cardObj, player, holderName) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_REMOVE_CARD,
      payload: {
        cardObj,
        player,
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