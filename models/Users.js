const mongoose = require("mongoose")
const { Schema } = mongoose;
const validator = require("validator");

const ClienteSchema = new Schema({
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
    },
    telefone:{
        type:String,
        required:true,
        validate: function(phoneNumber){
            return validator.isMobilePhone(this.telefone)
        }
    }
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;