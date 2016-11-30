import { PLAYFIELD_UPDATE_LIFE } from './constants';

export function updateLifeCounter(playerNum, life) {
  return (dispatch) => {
    dispatch({
      type: PLAYFIELD_UPDATE_LIFE,
      payload: {
        player: playerNum,
        lifeChange: life,
      }
    });
  }
}