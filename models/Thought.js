// Defining Schema, Types
const { Schema, model } = require('mongoose')

const reaction = require('./Reaction')

// schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            mingLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => timeSince(date),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual that retrieves the length of the thoughts reactions
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`
    });


// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

// exporting the model Thought 
module.exports = Thought;