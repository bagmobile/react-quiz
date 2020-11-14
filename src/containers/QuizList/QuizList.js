import React, {Component} from 'react';
import classes from './Quiz.module.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {QUIZ} from "../../store/reducers/types";
import {fetchQuizes} from "../../store/actions/quiz";


class QuizList extends Component {

    renderQuizList = () => {
        return this.props.quizes.map((quiz) =>
            <li key={quiz.id}><NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink></li>);
    }

    componentDidMount = () => {
        this.props.fetchQuizes();
    };

    render() {

        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of quiz</h1>
                    {this.props.loading && <Loader/>}
                    <ul>
                        {this.renderQuizList()}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        quizes: state[QUIZ].quizes,
        loading: state[QUIZ].loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
