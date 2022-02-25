const { UserModel } = require('../models');

//Dealing with data base operations
let action = {};

action.CreateCustomer = async ({ name, email, hashedPassword, salt }) => {
    try {
        const customer = new UserModel({
            name,
            email,
            hashedPassword,
            salt,
        })
        const customerResult = await customer.save();
        return customerResult;
    } catch(err) {
        console.log('API Error', 'Unable to Create Customer', err)
    }
}

action.FindCustomer = async ({ email }) => {
    try{
        const existingCustomer = await UserModel.findOne({ email: email });
        return existingCustomer;
    }catch(err){
        console.log('API Error', 'Unable to Find Customer')
    }
}

action.FindCustomerById = async ({ id }) => {

    try {
        const existingCustomer = await UserModel.findById(id)
        
        return existingCustomer;
    } catch (err) {
        console.log('API Error', 'Unable to Find Customer');
    }
}

module.exports = action;