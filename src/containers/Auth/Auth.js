import React, {Component} from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js"
import axios from "axios"

class Auth extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFormValid:false,
            formControls: {
                email: {
                    value: ``,
                    type: `email`,
                    label: `Email`,
                    errorMessage: `Enter a correct Email address`,
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: ``,
                    type: `password`,
                    label: `Password`,
                    errorMessage: `Enter a correct password`,
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        }
    }

    handleSignInClick = async () => {
        const authData = {
            email:  this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMAYQrcO2Ps2LM2f8zUQBFYUch_zrII0g`, authData);
        }catch (e) {
            console.log(e)
        }
    }

    handleSignUpClick = async () => {
        const authData = {
            email:  this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
           const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMAYQrcO2Ps2LM2f8zUQBFYUch_zrII0g`, authData);
        }catch (e) {
            console.log(e)
        }
    }

    handleFormSubmit = evt => {
        evt.preventDefault();
    }

    handleInputChange = (evt, controlName) => {

        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = evt.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(item => isFormValid = isFormValid && formControls[item].valid);

        this.setState({formControls, isFormValid});

    }

    validateControl = (value, validation) => {
        if (!validation) {
            return true;
        }
        let isValid = true;

        if(validation.required){
            isValid = isValid && value.trim() !== ``;
        }

        if (validation.email){
            isValid = isValid && is.email(value);
        }

        if (validation.minLength){
            isValid = isValid && value.length >= validation.minLength;
        }
        return isValid;
    }

    renderInputs = () => {
        return (
            Object.keys(this.state.formControls)
                .map((controlName, index) => {
                    const item = this.state.formControls[controlName]
                    return (<Input
                        key={index}
                        type={item.type}
                        label={item.label}
                        errorMessage={item.errorMessage}
                        valid={item.valid}
                        touched={item.touched}
                        shouldValidate={!!item.validation}
                        onChange={evt => this.handleInputChange(evt, controlName)}
                    />);
                })
        );
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form className={classes.AuthForm} onSubmit={this.handleFormSubmit}>

                        {this.renderInputs()}

                        <Button
                            type={`success`}
                            onClick={this.handleSignInClick}
                            disabled={!this.state.isFormValid}
                        >
                            Login
                        </Button>
                        <Button type={`primary`} onClick={this.handleSignUpClick}>
                            Registration
                        </Button>

                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;