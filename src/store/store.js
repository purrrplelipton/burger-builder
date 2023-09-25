import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { contents as contentsReducer } from "./reducers";

const reducers = combineReducers({ contents: contentsReducer });

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const enhancers = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducers, enhancers);

export default store;
