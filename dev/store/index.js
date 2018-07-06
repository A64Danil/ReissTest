import { combineReducers } from "redux";
import { answerReducer } from "./answers";
import { userReducer } from "./user";

export default combineReducers({ answerReducer, userReducer });
