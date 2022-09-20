// Defining Schema, Types
const { Schema, Types } = require('mongoose')

// Validation for email using regex
const validateEmail = function (email) {
    let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email)
};

// schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: [validateEmail, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual for keeping track of friend count
userSchema
    .virtual('friendCount')
    .get(function () {
        return `${this.friends.length}`
    });

// Initialize our User model
const User = model('user', userSchema)

// Exporting User model
module.exports = User;