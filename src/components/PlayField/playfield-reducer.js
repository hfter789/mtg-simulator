import { PLAYFIELD_SHOW_BIG_IMG, PLAYFIELD_TOGGLE_REVEAL } from './constants';

export default (state = {
  isLibraryReveal: [],
}, action) => {
  switch (action.type) {
    case PLAYFIELD_SHOW_BIG_IMG: {
      return {
        zoomInImage: action.payload,
        isLibraryReveal: state.isLibraryReveal,
      };
    }
    case PLAYFIELD_TOGGLE_REVEAL: {
      debugger;
      const { playerNum } = action.payload;
      state.isLibraryReveal[playerNum] = !state.isLibraryReveal[playerNum];
      return Object.assign({}, state);
    }
    default: return state || {};
  }
};
