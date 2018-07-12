import { combineReducers } from "redux";
import { answerReducer } from "./answers";
import { userReducer } from "./user";
import { animateReducer } from "./animate";
/* All REDUCERS COMBINED HERE */
export default combineReducers({ answerReducer, userReducer, animateReducer });
