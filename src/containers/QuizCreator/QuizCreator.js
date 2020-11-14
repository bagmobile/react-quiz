import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import {createControl, validate, validateForm} from "../../components/form/formFramework";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {CREATE} from "../../store/reducers/types";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";


function createOptionControl(number) {
    return createControl({
        id: number,
        label: `Item ${number}`,
        errorMessage: `The value can't be empty`
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: `Enter question`,
            errorMessage: `The question can't be empty`
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    handleFormSubmit = evt => {
        evt.preventDefault();
    }

    handleQuestionAdd = (evt) => {
        evt.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem);

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
    }

    handleTestCreate = async evt => {
        evt.preventDefault();

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
        this.props.finishCreateQuiz();

    }

    handleInputChange = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = formControls[controlName];

        control.touched = true;
        control.value = value;
        control.valid = validate(value, control.validation);
        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    handleSelectChange = (evt) => {
        this.setState({rightAnswerId: +evt.target.value});
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (<Auxiliary key={`${controlName} ${index}`}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={evt => this.handleInputChange(evt.target.value, controlName)}
                    />
                    {(index === 0) && <hr/>}
                </Auxiliary>
            );
        });
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create test</h1>
                    <form onSubmit={this.handleFormSubmit}>

                        {this.renderControls()}
                        <Select
                            label={`Choose right answer`}
                            value={this.state.rightAnswerId}
                            onChange={this.handleSelectChange}
                            options={[
                                {text: `1`, value: 1},
                                {text: `2`, value: 2},
                                {text: `3`, value: 3},
                                {text: `4`, value: 4}
                            ]}
                        />
                        <Button
                            type={`primary`}
                            onClick={this.handleQuestionAdd}
                            disabled={!this.state.isFormValid}
                        >Add question</Button>
                        <Button
                            type={`success`}
                            onClick={this.handleTestCreate}
                            disabled={this.props.quiz.length === 0}
                        >Create test</Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        quiz: state[CREATE].quiz
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
