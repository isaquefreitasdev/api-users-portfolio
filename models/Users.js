const mongoose = require("mongoose")
const { Schema } = mongoose;
const va = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const User = new Schema({
    name: { type: String, unique: false, required: true },
    email: {
        type: String, unique: true,
    },
    password: { type: String, min: 6, max: 12, required: true },
    validate: {
        valiEmail: () => {
            if (!email.isEmail) {
                res.json("Formato invalido")
            
            }

        }

    }
})

const modelUser = mongoose.model("user", User);


module.exports = modelUser;