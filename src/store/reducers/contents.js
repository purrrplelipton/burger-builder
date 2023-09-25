import { contents as contentsActions } from "@store/actions";

const initialState = {
  contents: null,
  error: null,
  loading: false,
  prices: {
    lettuce: 50,
    bacon: 200,
    cheese: 100,
    "onion-ring": 100,
    pickles: 50,
    patty: 300,
    tomato: 50,
  },
  total: 100,
};

function contents(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case contentsActions.SET_LOADING_STATE:
      return { ...state, loading: payload };

    case contentsActions.SET_CONTENTS: {
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

    case contentsActions.SET_ERROR:
      return { ...state, error: payload };

    case contentsActions.ADD_CONTENT: {
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

    case contentsActions.REMOVE_CONTENT: {
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

export default contents;
