import { PLAYFIELD_ADD_CARD,
  PLAYFIELD_REMOVE_CARD,
  PLAYFIELD_TOGGLE_TAP,
  PLAYFIELD_SHOW_BIG_IMG,
  PLAYFIELD_UPDATE_CARD,
  SHUFFLE_DECK } from './constants';

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

export function shuffleDeck(playerNum) {
  return (dispatch) => {
    dispatch({
      type: SHUFFLE_DECK,
      payload: {
        playerNum,
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

export function updateCard(cardObj, counterData, tokenName, tokenDesc) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_UPDATE_CARD,
      payload: {
        cardObj,
        counterData,
        tokenName,
        tokenDesc
      }
    })
  };
}