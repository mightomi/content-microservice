const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

const userDb = require("../database/services/user");

let action = {};

action.SignIn = async (userInputs) => {
    const { email, password } = userInputs;
    console.log( email, password );

    try {
        const existingCustomer = await userDb.FindCustomer({ email });

        if (existingCustomer) {
            const validPassword = await ValidatePassword(
                password,
                existingCustomer.hashedPassword,
                existingCustomer.salt
            );
            console.log("pass check ", validPassword, existingCustomer);

            if (validPassword) {
                const token = await GenerateSignature({
                    email: existingCustomer.email,
                    _id: existingCustomer._id,
                });
                return FormateData(
                    { 
                        success: true,
                        id: existingCustomer._id, 
                        token 
                    }
                );
            }
            else {
                return FormateData(
                    { 
                        success: false,
                        error: "Incorrect password"
                    }
                );
            }
        }
        else {
            return FormateData(
                { 
                    success: false,
                    error: "No valid user with this email Id"
                }
            );
        }

    } catch (err) {
        console.log("Error in ", err);
    }
};

const isValidEmailFormat = (email) => {

    if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return {success: true};
    }
    else {
        return {success: false, error: `Wrong Email Format.`};
    }
}

const isValidPasswordFormat = (password) => {

    if(password.length < 10) {
        return {success: false, error: `Password must be 10 characters long`}
    }
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumeric = false;
    let hasSpecial = false;

    for (let i = 0; i < password.length; i++) {
        if (password[i] >= 'a' && password[i] <= 'z')    hasUpperCase = true;
        else if (password[i] >= 'A' && password[i] <= 'Z')    hasLowerCase = true;
        else if (password[i] >= '0' && password[i] <= '9')    hasNumeric = true;
        else    hasSpecial = true;
    }

    if(hasUpperCase && hasLowerCase && hasNumeric && hasSpecial) {
        return {success: true};
    }
    else {
        return {
            success: false, 
            error : `Password must have atleast
            1 Upper Case
            1 Lower Case
            1 Numeric Case
            1 Special Case`
        }
    }
}

action.SignUp = async (userInputs) => {
    const { name, email, password } = userInputs;
    console.log(userInputs);

    let emailValidRes = isValidEmailFormat(email);
    if(!emailValidRes.success) {
        return FormateData(emailValidRes);
    }

    let passwordValidRes = isValidPasswordFormat(password);
    if(!passwordValidRes.success) {
        return FormateData(passwordValidRes);
    }


    try {
        // create salt
        let salt = await GenerateSalt();

        let hashedPassword = await GeneratePassword(password, salt);

        const existingCustomer = await userDb.CreateCustomer({
            name,
            email,
            hashedPassword,
            salt,
        });

        const token = await GenerateSignature({
            email: email,
            _id: existingCustomer._id,
        });

        return FormateData({success:true, id: existingCustomer._id, token });
    } catch (err) {
        console.log("Error in ", err);
    }
};


action.GetProfile = async (id) => {
    try {
        const existingCustomer = await userDb.FindCustomerById({ id });
        return FormateData(existingCustomer);
    } catch (err) {
        console.log("Error in ", err);
    }
};

module.exports = action;
