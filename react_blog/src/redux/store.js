import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  AuthReducer,
  fetchAllCategoriesReducer,
  fetchAllTagsReducer,
  fetchAllPostsReducer,
} from "../redux/reducers";

const rootReducer = combineReducers({
  AuthReducer,
  fetchAllCategoriesReducer,
  fetchAllTagsReducer,
  fetchAllPostsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
