import { OPEN_CARD_MENU, CLOSE_CARD_MENU } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
    case OPEN_CARD_MENU: {
      return {
        cardData: action.payload.props,
      };
    }
    case CLOSE_CARD_MENU: {
      return {
        cardData: null,
      };
    }
    default: return state || {};
  }
};
