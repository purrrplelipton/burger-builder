import { combineReducers, legacy_createStore as createStore } from "redux";
import { contentsReducer } from "./reducers";

const store = createStore(combineReducers({ contentsReducer }));

export default store;
