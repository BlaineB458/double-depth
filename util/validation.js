function isEmpty(value){
    return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password){
    return (email &&
    email.includes('@') &&
    password &&
    password.trim().length >= 6);
}

function userDetailsAreValid(email, password, username){
        return (
     userCredentialsAreValid(email, password) &&
     !isEmpty(username) &&
     username.length >= 6
    );
}

function passwordIsConfirmed(password, confirmPassword){
    return password === confirmPassword;
}

module.exports = {userDetailsAreValid: userDetailsAreValid, passwordIsConfirmed: passwordIsConfirmed};