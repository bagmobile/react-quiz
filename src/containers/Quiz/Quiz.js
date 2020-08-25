import React, {Component} from "react";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answerState: null,
            activeQuestion: 0,
            isFinished: false,
            results: {},
            quiz: [
                {
                    id: 1,
                    question: `What color is sky?`,
                    rightAnswerId: 4,
                    answers: [
                        {
                            id: 1,
                            text: `Black`
                        },
                        {
                            id: 2,
                            text: `Green`
                        },
                        {
                            id: 3,
                            text: `Red`
                        },
                        {
                            id: 4,
                            text: `Blue`
                        }
                    ]
                },
                {
                    id: 2,
                    question: `Was year Sankt-Peterburg based?`,
                    rightAnswerId: 3,
                    answers: [
                        {
                            id: 1,
                            text: `1778`
                        },
                        {
                            id: 2,
                            text: `1700`
                        },
                        {
                            id: 3,
                            text: `1703`
                        },
                        {
                            id: 4,
                            text: `1802`
                        }
                    ]
                }
            ]
        };
    }

    onResetGameHandler = () => {
        this.setState({
            answerState: null,
            activeQuestion: 0,
            isFinished: false,
            results: {}
        });
    }

    onAnswerClickHandler = (id) => {

        if (this.state.answerState && Object.values(this.state.answerState)[0] === `success`)
            return

        const results = this.state.results;
        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === id) {
            if (!results[question.id]) {
                results[question.id] = `success`;
            }

            this.setState({answerState: {[id]: `success`}, results});

            const timeOut = window.setTimeout(() => {

                if (this.state.activeQuestion === this.state.quiz.length - 1) {
                    this.setState({isFinished: true});
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                    window.clearTimeout(timeOut);
                }
            }, 500);

        } else {
            results[question.id] = `error`;
            this.setState({answerState: {[id]: `error`}, results});
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Please answer all questions</h1>
                    {this.state.isFinished
                        ? <FinishQuiz
                            quiz={this.state.quiz}
                            results={this.state.results}
                            onResetGame={this.onResetGameHandler}
                        />
                        : <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            answerState={this.state.answerState}
                        />
                    }

                </div>
            </div>
        );

    }
}

export default Quiz;