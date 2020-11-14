import React, {Component} from "react";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {QUIZ} from "../../store/reducers/types";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {

    componentDidMount = () => {
        this.props.fetchQuizById(this.props.match.params.id)
    };

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Please answer all questions</h1>
                    {this.props.loading && <Loader/>}
                    {this.props.isFinished
                    && <FinishQuiz
                        quiz={this.props.quiz}
                        results={this.props.results}
                        onResetGame={this.props.retryQuiz}
                    />}
                    {this.props.quiz && !this.props.isFinished
                    && <ActiveQuiz
                        question={this.props.quiz[this.props.activeQuestion].question}
                        answers={this.props.quiz[this.props.activeQuestion].answers}
                        onAnswerClick={this.props.quizAnswerClick}
                        quizLength={this.props.quiz.length}
                        answerNumber={this.props.activeQuestion + 1}
                        answerState={this.props.answerState}
                    />}

                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        answerState: state[QUIZ].answerState,
        activeQuestion: state[QUIZ].activeQuestion,
        isFinished: state[QUIZ].isFinished,
        results: state[QUIZ].results,
        quiz: state[QUIZ].quiz,
        loading: state[QUIZ].loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: id => dispatch(quizAnswerClick(id)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
