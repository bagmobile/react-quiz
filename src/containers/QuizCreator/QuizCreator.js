import React, {Component} from 'react';
import classes from './QuizCreator.module.css';
import {createControl, validate, validateForm} from "../../components/form/formFramework";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import axios from "../../axios/axios-quiz";


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
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    handleFormSubmit = evt => {
        evt.preventDefault();
    }

    handleQuestionAdd = (evt) => {
        evt.preventDefault();

        const quiz = [...this.state.quiz];
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        quiz.push(questionItem);

        this.setState({quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        });
    }

    handleTestCreate = async evt => {
        evt.preventDefault();

        try{
            await axios.post(`/quizes.json`, this.state.quiz);
            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls()
            });
        } catch (e) {
            console.log(e);
        }

        axios.post(`https://react-quiz-34afe.firebaseio.com/quizes.json`, this.state.quiz)
            .then(response => console.log(response))
            .catch(error => console.log(error));
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
                            disabled={this.state.quiz.length === 0}
                        >Create test</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;