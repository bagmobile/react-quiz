import React, {Component} from 'react';
import classes from './Quiz.module.css'
import {NavLink} from "react-router-dom";


class QuizList extends Component {

    renderQuizList = () => {
        return [1,2,3].map((item, index) =>
            <li key={index}><NavLink to={`/quiz/${index}`}>Quiz - {item}</NavLink></li>);
    }


    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of quiz</h1>
                    <ul>
                        {this.renderQuizList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default QuizList;