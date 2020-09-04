import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./Reducers/Auth/login";
import registerReducer from "./Reducers/Auth/register";
import fetchAllPostsReducer from "./Reducers/Posts/allpost";
import fetchSinglePostReducer from "./Reducers/Posts/singlepost";
import fetchAllTagsReducer from "./Reducers/Tags/alltags";
import createTagReducer from "./Reducers/Tags/createtag";
import editTagReducer from "./Reducers/Tags/edittag";
import deleteTagReducer from "./Reducers/Tags/deletetag";
import fetchAllCategoriesReducer from "./Reducers/Categories/allcategories";
import createCategoryReducer from "./Reducers/Categories/createcategories";
import editCategoryReducer from "./Reducers/Categories/editcategories";
import deleteCategoryReducer from "./Reducers/Categories/deletecategories";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  fetchAllPostsReducer,
  fetchSinglePostReducer,
  fetchAllTagsReducer,
  createTagReducer,
  editTagReducer,
  deleteTagReducer,
  fetchAllCategoriesReducer,
  createCategoryReducer,
  editCategoryReducer,
  deleteCategoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
