import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";
import {CREATE} from "../reducers/types";

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        const state = getState();
        await axios.post(`/quizes.json`, state[CREATE].quiz);
        dispatch(resetQuizCreation());
    }
}

function resetQuizCreation(){
    return {
        type: RESET_QUIZ_CREATION
    }
}
