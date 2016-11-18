import { CARD_SEARCH_RESULT, FULFILLED } from '../constants/action-constants';
import get from 'lodash/get';

export default (state = {}, action) => {
  switch (action.type) {
    case `${CARD_SEARCH_RESULT}_${FULFILLED}`: {
      return {
        cards: get(action, 'payload.data.cards')
      };
    }
    default: return state || {};
  }
};
