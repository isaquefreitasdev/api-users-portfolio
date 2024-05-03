const mongoose = require("mongoose")
const { Schema } = mongoose;
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },

        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 12
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
