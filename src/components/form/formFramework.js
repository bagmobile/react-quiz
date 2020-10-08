export function createControl(config, validation){
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ``
    }
}

export function validate(value, validation = null){

    if(!validation){
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = isValid && value !== ``
    }

    return isValid;
}

export function validateForm(formControls){
    return Object.keys(formControls).every(controlName => formControls[controlName].valid);
}