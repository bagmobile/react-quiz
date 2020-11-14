import React from "react";
import classes from "./Input.module.css"

const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && shouldValidate && touched;
}

const Input = props => {

    const {inputType = `text`, label, errorMessage = `Enter a correct value`} = props;
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)){
        cls.push(classes.invalid);
    }

    return (<div className={cls.join(` `)}>
        <label htmlFor={htmlFor}>{label}</label>
        <input
            id={htmlFor}
            type={inputType}
            value={props.value}
            onChange={props.onChange}
        />
        {isInvalid(props) && <span>{errorMessage}</span>}

    </div>);
}

export default Input;
