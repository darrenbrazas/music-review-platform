const form = document.getElementById("form");
const firstNameInputEl = document.getElementById("firstName-input");
const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");
const repeatPasswordInputEl = document.getElementById("repeatPassword-input");
const errorMsgEl = document.getElementById("error-message");

form.addEventListener("submit", (e) => {


    e.preventDefault();


    let errors = [];

    if(firstNameInputEl){

        errors = getSignupErrors(firstNameInputEl.value, emailInputEl.value, passwordInputEl.value, repeatPasswordInputEl.value)
    }else{


        errors = getLoginErrors(emailInputEl.value, passwordInputEl.value);
    }

    if(errors.length > 0){

        e.preventDefault();
        errorMsgEl.innerText = errors.join(". ");
    }
});

const getLoginErrors = (email, password) => {

    let errors = [];

    if(email === '' || email == null){

        errors.push('Email is Required');
        emailInputEl.parentElement.classList.add("Incorrect");
    }
    if(password === '' || password == null){

        errors.push('Password is Required');
        passwordInputEl.parentElement.classList.add("Incorrect");
    }
    if(password.length < 8){


        errors.push('Password must have at least 8 characters');
        passwordInputEl.parentElement.classList.add("Incorrect");
    }


    

    return errors;


};


const getSignupErrors = (firstName, email, password, repeatPassword) => {

    let errors = [];

    if(firstName === '' || firstName == null){

        errors.push('First Name is Required');
        firstNameInputEl.parentElement.classList.add("Incorrect");
    }
    if(email === '' || email == null){

        errors.push('Email is Required');
        emailInputEl.parentElement.classList.add("Incorrect");
    }
    if(password === '' || password == null){

        errors.push('Password is Required');
        passwordInputEl.parentElement.classList.add("Incorrect");
    }
    if(password.length < 8){


        errors.push('Password must have at least 8 characters');
        passwordInputEl.parentElement.classList.add("Incorrect");
    }
    if(password !== repeatPassword){

        errors.push('Password does not match');
        passwordInputEl.parentElement.classList.add("Incorrect");
        repeatPasswordInputEl.parentElement.classList.add("Incorrect");
    }

    return errors;


};

const allInputs  = [firstNameInputEl, emailInputEl, passwordInputEl, repeatPasswordInputEl].filter(input => input != null);

allInputs.forEach((input) => {
    input.addEventListener("input", () => {
        if(input.parentElement.classList.contains("Incorrect")){
            input.parentElement.classList.remove("Incorrect");
            errorMsgEl.innerText = '';
        }
    });
});


