export default (state = [{ life: 20 }, { life: 20 }], action) => {
  switch (action.type) {
    // case PLAYFIELD_ADD_CARD: {
    //   const { holderName, cardObj } = action.payload;
    //   const normalizeHolder = normalize(holderName);
    //   const targetHolder = state[normalizeHolder] || [];
    //   targetHolder.unshift(cardObj);
    //   const newStateSubset = {};
    //   newStateSubset[normalizeHolder] = targetHolder;
    //   return Object.assign({}, state, newStateSubset);
    // }
    default: return state || {};
  }
};
