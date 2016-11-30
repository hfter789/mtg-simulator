import { PLAYFIELD_UPDATE_LIFE } from './constants';

export default (state = [{ life: 20 }, { life: 20 }], action) => {
  switch (action.type) {
    case PLAYFIELD_UPDATE_LIFE: {
        const { player, lifeChange } = action.payload;
        state[player].life += lifeChange;
        return Object.assign([], state);
    }
    default: return state || {};
  }
};
