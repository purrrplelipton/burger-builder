import { contents as contentsActions } from "@store/actions";

const PRICES = {
  lettuce: 50,
  bacon: 200,
  cheese: 100,
  "onion-ring": 100,
  pickles: 50,
  patty: 300,
  tomato: 50,
};

const initialState = {
  contents: null,
  error: null,
  loading: false,
  total: 100,
};

function contents(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case contentsActions.SET_LOADING_STATE:
      return { ...state, loading: payload };

    case contentsActions.SET_CONTENTS: {
      const newState = { ...state, contents: payload };
      let updatedTotal = state.total;
      Object.keys(newState.contents).forEach((cn) => {
        if (newState.contents[cn] > 0) {
          for (let i = 0; i < newState.contents[cn]; i++) {
            updatedTotal += PRICES[cn];
          }
        }
      });

      return { ...newState, total: updatedTotal };
    }

    case contentsActions.SET_ERROR:
      return { ...state, error: payload };

    case contentsActions.ADD_CONTENT: {
      return {
        ...state,
        contents: { ...state.contents, [payload]: state.contents[payload] + 1 },
        total: state.total + PRICES[payload],
      };
    }

    case contentsActions.REMOVE_CONTENT: {
      const updatedContents = {
        ...state.contents,
        [payload]:
          state.contents[payload] >= 1
            ? state.contents[payload] - 1
            : state.contents[payload],
      };

      return {
        ...state,
        contents: { ...updatedContents },
        total:
          state.total - PRICES[payload] >= 100
            ? state.total - PRICES[payload]
            : state.total,
      };
    }

    default:
      return { ...state };
  }
}

export default contents;
