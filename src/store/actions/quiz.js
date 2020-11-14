import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE,
    RETRY_QUIZ
} from "./actionTypes";
import {QUIZ} from "../reducers/types";

export function fetchQuizes() {

    return async dispatch => {

        dispatch(fetchQuizesStart());

        try {
            const response = await axios.get(`/quizes.json`);
            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test - ${index + 1}`
                });
            });

            dispatch(fetchQuizesSuccess(quizes));

        } catch (e) {
            dispatch(fetchQuizesError(e));
        }

    }
}

export function fetchQuizById(id){

    return async dispatch => {

        dispatch(fetchQuizesStart());

        try {
            const response = await axios.get(`/quizes/${id}.json`);
            dispatch(fetchQuizSuccess(response.data));

        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}

export function quizAnswerClick(id) {

   return (dispatch, getState) => {
       const state = getState()[QUIZ];

       if (state.answerState && Object.values(state.answerState)[0] === `success`)
           return

       const results = state.results;
       const question = state.quiz[state.activeQuestion];

       if (question.rightAnswerId === id) {
           if (!results[question.id]) {
               results[question.id] = `success`;
           }

           dispatch(quizSetState({[id]: `success`}, results))

           const timeOut = window.setTimeout(() => {

               if (isQuizFinish(state)) {
                   dispatch(finishQuiz());
               } else {
                   dispatch(quizNextQuestion(state.activeQuestion + 1));
                   window.clearTimeout(timeOut);
               }
           }, 500);

       } else {
           results[question.id] = `error`;
           dispatch(quizSetState({[id]: `error`}, results));
       }
   }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}

function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    };
}

function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    };
}

function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    };
}

function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    };
}

function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

function finishQuiz() {
    return {
        type: FINISH_QUIZ,
        isFinished: true
    }
}

function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}

function isQuizFinish(state) {
    return state.activeQuestion === state.quiz.length - 1
}


