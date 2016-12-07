import { PLAYFIELD_ADD_CARD,
  PLAYFIELD_REMOVE_CARD,
  PLAYFIELD_TOGGLE_TAP,
  PLAYFIELD_SHOW_BIG_IMG,
  PLAYFIELD_UPDATE_CARD,
  SHUFFLE_DECK,
  PLAYFIELD_TOP_CARD_TO_BOT,
  PLAYFIELD_TOGGLE_REVEAL,
  PLAYFIELD_UNTAP_ALL,
  PLAYFIELD_CLONE_CARD,
  } from './constants';

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

export function putTopToBottom(playerNum) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_TOP_CARD_TO_BOT,
      payload: {
        playerNum,
      }
    });
  }
}

export function untapAll(playerNum) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_UNTAP_ALL,
      payload: {
        playerNum,
      }
    });
  }
}

export function toggleLibReveal(playerNum) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_TOGGLE_REVEAL,
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

export function cloneCard(cardObj, counterData, tokenName, tokenDesc) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_CLONE_CARD,
      payload: {
        cardObj,
      }
    })
  };
}