import axios from 'axios';
const MTG_API = 'https://api.magicthegathering.io/v1/cards';
import { CARD_SEARCH_RESULT } from '../../constants/action-constants';

export function searchCard(cardName) {
  return (dispatch) => {
    const url = `${MTG_API}?name=${cardName}`;
    dispatch({
      type: CARD_SEARCH_RESULT,
      payload: axios.get(url),
    });
  }
};