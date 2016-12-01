import { PLAYFIELD_ADD_CARD, PLAYFIELD_REMOVE_CARD, PLAYFIELD_TOGGLE_TAP, PLAYFIELD_SHOW_BIG_IMG, UPDATE_CARD_COUNTER } from './constants';

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

export function showZoomInImage(coord, props) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_SHOW_BIG_IMG,
      payload: {
        coord,
        props,
      }
      ,
    })
  };
}

export function updateCardCounter(cardObj, counterData) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CARD_COUNTER,
      payload: {
        cardObj,
        counterData,
      }
    })
  };
}