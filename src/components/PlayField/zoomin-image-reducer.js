import { PLAYFIELD_SHOW_BIG_IMG } from './constants';

export default (state = {}, action) => {
  switch (action.type) {
    case PLAYFIELD_SHOW_BIG_IMG: {
      return action.payload;
    }
    default: return state || {};
  }
};
