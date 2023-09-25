import xs from "@src/xs";

const ADD_CONTENT = "ADD_CONTENT";

const REMOVE_CONTENT = "REMOVE_CONTENT";

const SET_LOADING_STATE = "SET_LOADING_STATE";

const SET_CONTENTS = "SET_CONTENTS";

const SET_ERROR = "SET_ERROR";

const setContents = () => (dispatch, getState) => {
  dispatch({ type: SET_LOADING_STATE, payload: true });
  xs.get("/ingredients.json")
    .then(({ data }) => {
      dispatch({ type: SET_CONTENTS, payload: data });
      console.log(getState());
      // const { contents } = getState();
      // if (contents.error) {
      //   dispatch({ type: SET_ERROR, payload: null });
      // }
    })
    .catch((error) => dispatch({ type: SET_ERROR, payload: error }))
    .finally(() => dispatch({ type: SET_LOADING_STATE, payload: false }));
};

const addContent = (payload) => ({ type: ADD_CONTENT, payload });

const removeContent = (payload) => ({ type: REMOVE_CONTENT, payload });

const setError = (payload) => ({ type: SET_ERROR, payload });

export {
  ADD_CONTENT,
  REMOVE_CONTENT,
  SET_ERROR,
  addContent,
  removeContent,
  setContents,
  setError,
};
