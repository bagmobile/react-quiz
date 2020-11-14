import {combineReducers} from "redux";
import quizReducer from "./quiz";
import {AUTH, CREATE, QUIZ} from "./types";
import createReducer from "./create";
import {authReducer} from "./auth";


export default combineReducers({
    [QUIZ]: quizReducer,
    [CREATE]: createReducer,
    [AUTH]: authReducer
});
