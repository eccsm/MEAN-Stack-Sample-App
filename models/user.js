const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const crypto = require("crypto");

const Schema = mongoose.Schema;

const jwt = require("jsonwebtoken");


let User = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: [true, "Please enter a password..."],
        minlength: [6, "Password needs to be at least 6 character.."]

    },
    email: {

        type: String,
        unique: true,
        required: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please enter email with correct format..."
        ]
    },
    role: {
        type: String
    },
    rank: {
        type: String
    },
    forgotPasswordToken: {

        type: String
    },

    forgotPasswordTokenExpires: {

        type: Date
    },
}, {
    collection: 'user'
})

User.methods.generateJWT = function () {


    const payload = {
        id: this.id,
        name: this.name,
        expiresIn: Date.now() + 600000
    }

    const token = jwt.sign(payload, "yırtıcıhamza", { expiresIn: "10m" });


    return token;

}

User.methods.forgotPasswordTokenGenerator = function () {

    const { FORGOT_PASSWORD_TOKEN_EXPIRATION } = process.env;

    const randomHex = crypto.randomBytes(15).toString("hex");

    const tokenToMail = crypto.createHash("SHA256").update(randomHex).digest("hex");

    this.forgotPasswordToken = tokenToMail;

    this.forgotPasswordTokenExpires = Date.now() + parseInt(FORGOT_PASSWORD_TOKEN_EXPIRATION);

    return tokenToMail;

}

User.pre("save", function (next) {
    if (!this.isModified("password")) {

        next();

    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) next(err);

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) next(err);
                this.password = hash;
                next();
            });
        });
    }
});

User.pre("update", function (next) {
    if (!this.isModified("password")) {

        next();

    }
    else {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) next(err);

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) next(err);
                this.password = hash;
                next();
            });
        });
    }
});

module.exports = mongoose.model('User', User)