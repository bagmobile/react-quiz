import React from "react";
import classes from "./FinishedQuiz.module.css"
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";


const FinishQuiz = props => {
    const rightCount = Object.values(props.results).reduce((acc, value) => {
        acc = value === `success` ? acc + 1 : acc;
        return acc;
    }, 0);
    return (
    <div className={classes.FinishQuiz}>
        <ul>
        {props.quiz.map((item, index) =>
            <li key={index}>
                <strong>{index + 1}. </strong>
                {item.question} - {item.answers[item.rightAnswerId - 1].text}
                {props.results[item.id] === `success` &&  <i className={`fa fa-check ${classes.success}`}/>}
                {props.results[item.id] === `error` &&  <i className={`fa fa-times ${classes.error}`}/>}
            </li>
        )}
        </ul>
        <p>Right {rightCount} from {props.quiz.length}</p>
        <Button onClick={props.onResetGame} type={`primary`}>Play again</Button>
        <Link to={`/`}><Button type={`success`}>Go to list of tests</Button></Link>
    </div>
)};

export default FinishQuiz;