import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./Reducers/Auth/login";
import registerReducer from "./Reducers/Auth/register";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
