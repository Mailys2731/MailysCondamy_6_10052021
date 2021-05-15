const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const AuthsSchema = mongoose.Schema(
    
    {
        email:{
            type:String,
            required: true,
            unique:true,
        },
        password:{
            type:String,
            required: true
        }
    }
);
AuthsSchema.plugin(uniqueValidator);

const Auth = mongoose.model('Auth', AuthsSchema)

module.exports = { Auth };

