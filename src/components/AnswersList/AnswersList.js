import React from "react";
import classes from "./AnswersList.module.css";
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, index) =>
            <AnswerItem
                key={index}
                answer={answer}
                answerState={props.answerState ? props.answerState[answer.id] : null}
                onAnswerClick={props.onAnswerClick}/>
            )}
    </ul>
);

export default AnswersList;