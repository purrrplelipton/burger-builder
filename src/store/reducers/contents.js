import { contentActions } from "@store/actions";

const initialState = {
  contents: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    "onion-ring": 0,
    pickles: 0,
    patty: 0,
    tomato: 0,
  },
  total: 100,
  prices: {
    lettuce: 50,
    bacon: 200,
    cheese: 100,
    "onion-ring": 100,
    pickles: 50,
    patty: 300,
    tomato: 50,
  },
};

function contentsReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case contentActions.UPDATE_CONTENTS: {
      const stateClone = { ...state, contents: payload };
      let newTotal = stateClone.total;
      Object.keys(stateClone.contents).forEach((key) => {
        if (stateClone.contents[key] > 0) {
          for (let i = 0; i < stateClone.contents[key]; i += 1) {
            newTotal += stateClone.prices[key];
          }
        }
      });

      return { ...stateClone, total: newTotal };
    }

    case contentActions.ADD_CONTENT: {
      const stateClone = { ...state };
      const updatedContents = {
        ...stateClone.contents,
        [payload]: (stateClone.contents[payload] += 1),
      };
      const updatedState = {
        ...state,
        contents: updatedContents,
        total: (stateClone.total += state.prices[payload]),
      };

      return { ...updatedState };
    }

    case contentActions.REMOVE_CONTENT: {
      const stateClone = { ...state };
      const updatedContents = {
        ...stateClone.contents,
        [payload]: (stateClone.contents[payload] -= 1),
      };
      const updatedState = {
        ...state,
        contents: updatedContents,
        total: (stateClone.total -= state.prices[payload]),
      };

      return { ...updatedState };
    }

    default:
      return { ...state };
  }
}

export default contentsReducer;
