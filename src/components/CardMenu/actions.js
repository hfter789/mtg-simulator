import { OPEN_CARD_MENU, CLOSE_CARD_MENU } from './constants';

export function showCardMenu(props) {
  return (dispatch) => {
    dispatch({
      type: OPEN_CARD_MENU,
      payload: {
        props,
      }
    })
  };
}

export function closeCardMenu() {
  return (dispatch) => {
    dispatch({
      type: CLOSE_CARD_MENU,
    })
  };
}